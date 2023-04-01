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

      if (is_driver) {
        throw new Error("Only Normal User can make reservation");
      }

      const startLocationText = `${start_location.latitude}/${start_location.longitude}`;
      const departureLocationText = `${departure_location.latitude}/${departure_location.longitude}`;

      const totalDistance: number = distance(start_location, departure_location);

      const price: number = Math.floor(totalDistance * this.config.get("PRICE_PER_KM"));

      const customer = await this.userRepository.getUserByEmail(email);

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

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
