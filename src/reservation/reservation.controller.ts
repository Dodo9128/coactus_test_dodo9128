import { UseGuards, Controller, Req, Res, Get, Post, Body, Patch, Param, Delete, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { AuthGuard } from "../global/authguard";

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard)
  @Post("make")
  async makeReservation(@Body() createReservationDto: CreateReservationDto, @Res() res: Response) {
    const result = await this.reservationService.makeReservation(createReservationDto);
    return result.result ? res.status(HttpStatus.OK).json(result) : res.status(HttpStatus.BAD_REQUEST).json(result);
  }

  @UseGuards(AuthGuard)
  @Get("user")
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reservationService.remove(+id);
  }
}
