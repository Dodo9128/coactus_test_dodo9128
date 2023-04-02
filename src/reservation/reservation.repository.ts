import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Reservation } from "../entities/reservation.entity";

@Injectable()
export class ReservationRepository {
  constructor(private readonly dataSource: DataSource) {}

  async makeReservation(data) {
    const { start_location, departure_location, distance, price, reservation_status, customer } = data;
    const createReservation = this.dataSource.getRepository(Reservation).create({ ...data });
    const reservationSave = await this.dataSource.getRepository(Reservation).save(createReservation);
    return reservationSave ? true : false;
  }

  async getReservationForCustomer(id) {
    return await this.dataSource
      .getRepository(Reservation)
      .createQueryBuilder()
      .select("*")
      .where(`customer_id = :id`, { id: id })
      .getRawMany();
  }

  async getAllReservationForDriver(order_column, order_option, reservation_status) {
    // 가격순이면 내림차순으로 리턴
    if (order_column === "price") order_option = "DESC";
    return reservation_status
      ? await this.dataSource
          .getRepository(Reservation)
          .createQueryBuilder()
          .select("*")
          .where("reservation_status = :reservation_status", { reservation_status: reservation_status })
          .orderBy(order_column, order_option)
          .getRawMany()
      : await this.dataSource
          .getRepository(Reservation)
          .createQueryBuilder()
          .select("*")
          .orderBy(order_column, order_option)
          .getRawMany();
  }

  async getReservationFromId(reservation_id) {
    return await this.dataSource
      .getRepository(Reservation)
      .createQueryBuilder()
      .select("*")
      .where(`id = :reservation_id`, { reservation_id: reservation_id })
      .getRawOne();
  }

  async acceptReservation(reservation_id, select_status, driver) {
    let result;
    if (select_status !== "yet") {
      // yet이 아닌 경우에는 여기서 다 처리 가능_ driver가 바뀔 일이 없음
      result = await this.dataSource
        .getRepository(Reservation)
        .createQueryBuilder()
        .update<Reservation>(Reservation, { reservation_status: select_status, driver: driver })
        .where(`id = :reservation_id`, { reservation_id: reservation_id })
        .execute();
    } else {
      // yet인 경우로 돌아갈 때에는 드라이버를 삭제해야 함
      result = await this.dataSource
        .getRepository(Reservation)
        .createQueryBuilder()
        .update<Reservation>(Reservation, { reservation_status: select_status, driver: null })
        .where(`id = :reservation_id`, { reservation_id: reservation_id })
        .execute();
    }
    return result;
  }
}
