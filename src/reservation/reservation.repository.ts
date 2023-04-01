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
}
