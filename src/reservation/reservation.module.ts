import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { ReservationController } from "./reservation.controller";
import { ReservationRepository } from "./reservation.repository";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository, UserService, UserRepository],
})
export class ReservationModule {}
