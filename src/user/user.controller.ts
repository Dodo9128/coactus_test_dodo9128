import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { sendOk, sendFail } from "../global/functionReturn";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/join")
  async join(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.userService.join(createUserDto);
    return result
      ? res.status(HttpStatus.OK).json(sendOk(`${createUserDto.email} join success`, null))
      : res.status(HttpStatus.BAD_REQUEST).json(sendFail(`${createUserDto.email} join fail`, null));
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
