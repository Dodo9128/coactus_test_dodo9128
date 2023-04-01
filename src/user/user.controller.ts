import {
  Controller,
  Headers,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { sendOk, sendFail } from "../global/functionReturn";
import { AuthGuard } from "../global/authguard";

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

  @Post("login")
  async login(@Body() loginInfo, @Req() req: Request, @Res() res: Response) {
    const headers = req.headers;
    const data = { loginInfo: loginInfo, headers: headers };
    const result = await this.userService.login(data);

    return result
      ? res.status(HttpStatus.OK).json(sendOk(`${loginInfo.email} login success`, result))
      : res.status(HttpStatus.BAD_REQUEST).json(sendFail(`${loginInfo.email} login fail`, null));
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async getUser(@Param("id") id: string, @Res() res: Response) {
    const result = await this.userService.getUser(+id);
    console.log("RERERERE :", result);
    return result
      ? res.status(HttpStatus.OK).json(sendOk(`email ${result.email} user info`, result))
      : res.status(HttpStatus.NOT_FOUND).json(sendFail("Something Wrong", null));
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
