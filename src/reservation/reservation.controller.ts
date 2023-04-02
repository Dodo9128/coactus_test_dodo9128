import { UseGuards, Controller, Req, Res, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { AuthGuard } from "../global/authguard";

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 고객의 예약 생성
  @UseGuards(AuthGuard)
  @Post("customer/make")
  async makeReservation(@Body() createReservationDto: CreateReservationDto, @Res() res: Response) {
    const result = await this.reservationService.makeReservation(createReservationDto);
    return result.result ? res.status(HttpStatus.OK).json(result) : res.status(HttpStatus.BAD_REQUEST).json(result);
  }

  // 고객의 예약 조회
  @UseGuards(AuthGuard)
  @Get("customer/get_reservation")
  async getReservationForCustomer(@Body() customerInfo, @Res() res: Response) {
    const result = await this.reservationService.getReservationForCustomer(customerInfo);
    return result.result ? res.status(HttpStatus.OK).json(result) : res.status(HttpStatus.BAD_REQUEST).json(result);
  }

  // 드라이버의 예약 조회 (유저, 드라이버 상관없이 모두 조회)
  @UseGuards(AuthGuard)
  @Get("driver/get_all_reservation/")
  async getAllReservationForDriver(
    @Body() driverInfo,
    @Res() res: Response,
  ) {
    const result = await this.reservationService.getAllReservationForDriver(driverInfo);
    return result.result ? res.status(HttpStatus.OK).json(result) : res.status(HttpStatus.BAD_REQUEST).json(result);
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.reservationService.findOne(+id);
  // }
  //
  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateReservationDto: UpdateReservationDto) {
  //   return this.reservationService.update(+id, updateReservationDto);
  // }
  //
  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.reservationService.remove(+id);
  // }
}
