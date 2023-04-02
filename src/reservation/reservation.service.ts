import { HttpException, Injectable } from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { ReservationRepository } from "./reservation.repository";
import { UserRepository } from "../user/user.repository";
import { makeErrorInfoObjForHttpException } from "../global/globalErrorHandler";
import { distance, sendFail, sendOk } from "../global/functionReturn";
import { ConfigService } from "@nestjs/config";
import { IResultReturn } from "../global/interface";

@Injectable()
export class ReservationService {
  constructor(
    private readonly config: ConfigService,
    private readonly reservationRepository: ReservationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async makeReservation(createReservationDto): Promise<IResultReturn> {
    try {
      const { id, email, is_driver, start_location, departure_location, start_at } = createReservationDto;

      const customer = await this.userRepository.getUserByEmail(email);

      const customer_is_driver = customer.is_driver;

      if (is_driver || email !== customer.email || customer_is_driver) {
        throw new Error("Only Normal User can make reservation");
      }

      const startLocationText = `${start_location.latitude}/${start_location.longitude}`;
      const departureLocationText = `${departure_location.latitude}/${departure_location.longitude}`;

      const totalDistance: number = distance(start_location, departure_location);

      const price: number = Math.floor(totalDistance * this.config.get("PRICE_PER_KM"));

      const data = {
        start_location: startLocationText,
        departure_location: departureLocationText,
        distance: totalDistance,
        price: price,
        reservation_status: "yet",
        customer: customer,
        start_at: start_at,
      };

      const result = await this.reservationRepository.makeReservation(data);
      if (result) {
        return sendOk("Reservation Making Success", true);
      }
      return sendFail(`Reservation Making Fail`, null);
    } catch (err) {
      const errorInfo = makeErrorInfoObjForHttpException(ReservationService.name, "makeReservation", err);
      throw new HttpException(errorInfo, 401);
    }
  }

  async getReservationForCustomer(customerInfo) {
    try {
      const { email, is_driver } = customerInfo;

      const customer = await this.userRepository.getUserByEmail(email);

      const customer_is_driver = customer.is_driver;

      if (is_driver || is_driver !== customer_is_driver) {
        throw new Error("Only Normal User can Get Reservation For Customer");
      }

      const result = await this.reservationRepository.getReservationForCustomer(customer.id);

      if (result) {
        return sendOk(`${email} reservations`, result);
      }
      return sendFail(`${email} reservation inquire fail`, null);
    } catch (err) {
      const errorInfo = makeErrorInfoObjForHttpException(ReservationService.name, "getReservationForCustomer", err);
      throw new HttpException(errorInfo, 403);
    }
  }

  // 드라이버 상관없이 현재 등록된 모든 예약 조회
  async getAllReservationForDriver(driverInfo) {
    try {
      const { email, is_driver, order_by, search_option, reservation_status } = driverInfo;

      const driver = await this.userRepository.getUserByEmail(email);

      const driver_is_driver = driver.is_driver;

      if (!is_driver || is_driver !== driver_is_driver) {
        throw new Error("Only Driver can Get Reservation For Driver");
      }

      // order_by의 값에 따른 정렬 옵션 체인지
      /**
       * order_by = {
       *     order_column: "start_at" | "price" | "distance",
       *     order_option: ASC
       *     distance_values?: {
       *         latitude: "24.038485",
       *         longitude: "23.984209"
       *     }
       * }
       *
       * price 일때는 최대값부터 return (DESC)
       * distance 일때는 reservation의 start 좌표값과 입력받은 좌표값의 거리를 계산해
       * 최소값부터 return (ASC)
       */

      /**
       * search_option = {
       *     kind_of_option: "date" | "distance"
       *     option_values: "2023-04-02 12:00:00" || {
       *         latitude: "24.038485",
       *         longitude: "23.984209"
       *     }
       * }
       *
       * 날짜일 땐 입력받은 날짜 이후의 값들만 골라오고 (ASC)
       * distance 일때는 reservation의 start 좌표값과 입력받은 좌표값의 거리를 계산해
       * 최소값부터 return (ASC)
       */

      const order_column = order_by?.order_column ? order_by.order_column : this.config.get("DEFAULT_ORDER_COLUMN");

      const order_option = order_by?.order_option ? order_by.order_option : this.config.get("DEFAULT_ORDER_OPTION");

      const distance_values = order_by?.distance_values ? order_by.distance_values : undefined;
      // search_option이 있을 때와 없을 때를 나눠야 한다

      let result;

      if (!search_option) {
        // distance_values 있고 없을 때 나눠야 함 (order 조건이 distance 일 경우 계산해야 함)
        if (!distance_values) {
          result = await this.reservationRepository.getAllReservationForDriver(
            order_column,
            order_option,
            reservation_status,
          );
        } else {
          // 드라이버와 고객간 거리순 정렬
          const wholeReservation = await this.reservationRepository.getAllReservationForDriver(
            order_column,
            order_option,
            reservation_status,
          );
          // 일단 꺼내 왔음
          // distance_values의 좌표와 전체 예약의 start_좌표의 차이를 계산해야 함

          wholeReservation.forEach(reservation => {
            const start_location = {
              latitude: Number(reservation.start_location.split("/")[0]),
              longitude: Number(reservation.start_location.split("/")[1]),
            };
            reservation["customer_location_distance"] = distance(start_location, distance_values);
          });

          // 드라이버 - 선택지역 거리순 오름차순 정렬
          wholeReservation.sort((prev, next) => {
            if (prev.customer_location_distance > next.customer_location_distance) return 1;
            if (prev.customer_location_distance < next.customer_location_distance) return -1;
          });

          result = wholeReservation;
        }
      } else {
        // searchOption 존재
        // searchOption은 날짜, 지역 존재할 수 있음
        let wholeReservation = await this.reservationRepository.getAllReservationForDriver(
          order_column,
          order_option,
          reservation_status,
        );

        // 검색조건 날짜
        if (search_option.kind_of_option === "date") {
          const searchDate = Date.parse(search_option.option_values);
          const preReservation = [];
          wholeReservation.forEach(reservation => {
            const reservationDate = reservation.start_at.getTime();
            if (reservationDate > searchDate) preReservation.push(reservation);
          });

          // wholeReservation.filter(reservation => reservation.start_at.getTime() > searchDate);

          wholeReservation = preReservation;
        } else {
          // 검색조건 거리순
          wholeReservation.forEach(reservation => {
            const start_location = {
              latitude: Number(reservation.start_location.split("/")[0]),
              longitude: Number(reservation.start_location.split("/")[1]),
            };
            reservation["customer_driver_distance"] = distance(start_location, search_option.option_values);
          });

          // 드라이버 - 고객 거리순 오름차순 정렬
          wholeReservation.sort((prev, next) => {
            if (prev.customer_driver_distance > next.customer_driver_distance) return 1;
            if (prev.customer_driver_distance < next.customer_driver_distance) return -1;
          });
        }

        result = wholeReservation;
      }

      if (result) {
        return sendOk(`All reservations`, result);
      }
      return sendFail(`All reservation inquire fail`, null);
    } catch (err) {
      const errorInfo = makeErrorInfoObjForHttpException(ReservationService.name, "getReservationForDriver", err);
      throw new HttpException(errorInfo, 403);
    }
  }

  // 드라이버의 select / 예약 수락 로직
  // select on, off 받을 수 있어야 함
  // reservation_status !== yet && reservation.driver_id === driver.id 일 때 confirm, done 처리 가능
  async acceptReservation(driverInfo) {
    const { email, is_driver, reservation_id, select_status } = driverInfo;

    const driver = await this.userRepository.getUserByEmail(email);

    const driver_is_driver = driver.is_driver;

    if (!is_driver || is_driver !== driver_is_driver) {
      throw new Error("Only Driver can Get Reservation For Driver");
    }

    const current_reservation = await this.reservationRepository.getReservationFromId(reservation_id);

    if (
      current_reservation.reservation_status === "yet" ||
      (current_reservation.reservation_status !== "yet" && current_reservation.driver_id === driver.id) ||
      ["confirm", "done"].indexOf(current_reservation.reservation_status) === -1
    ) {
      const result = await this.reservationRepository.acceptReservation(reservation_id, select_status, driver);

      return sendOk("Reservation Select Change has Success", true);
    } else {
      throw new Error("This Reservation has already selected / comfirmed");
    }
  }
}
