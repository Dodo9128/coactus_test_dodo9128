import { HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";
import { ConfigService } from "@nestjs/config";
import { User } from "../entities/user.entity";
import { makeErrorInfoObjForHttpException } from "../global/globalErrorHandler";
import { IUpdateUserInfo } from "../global/interface";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly config: ConfigService) {}

  async verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.config.get("JWT_SALT")) as (jwt.JwtPayload | string) & User;

      const { email } = payload;
      return {
        email,
      };
    } catch (err) {
      return false;
    }
  }

  async join(createUserDto: CreateUserDto) {
    // bcrypt hash & send true || false
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const result = await this.userRepository.join(createUserDto);
    return result;
  }

  async login(data) {
    try {
      const { loginInfo, headers } = data;
      console.log("LOGIN INFO :", loginInfo);
      console.log("headers :", headers);
      const email = loginInfo.email;
      const password = loginInfo.password;
      const getUserByEmail = await this.userRepository.getUserByEmail(email);

      const validatePassword = await bcrypt.compare(password, getUserByEmail.password);
      if (!getUserByEmail || !validatePassword) {
        // throw new UnauthorizedException();
        // throw new Error("Not Found");
        return false;
      }

      const jwtToken = jwt.sign({ email: email }, this.config.get("JWT_SALT"), {
        expiresIn: this.config.get("JWT_EXPIRES"),
      });

      const userInfo = {
        id: getUserByEmail.id,
        email: getUserByEmail.email,
        is_driver: getUserByEmail.is_driver,
        created_at: getUserByEmail.created_at,
      };

      return { token: jwtToken, userInfo: userInfo };
    } catch (err) {
      const errorInfo = makeErrorInfoObjForHttpException(UserService.name, "login", err);
      throw new HttpException(errorInfo, 200);
    }
  }

  async getUser(userId: number) {
    try {
      const result = await this.userRepository.getUserByIdWithoutPassword(userId);

      if (!result) {
        throw new Error("User not found");
      }

      return result;
    } catch (err) {
      console.log(err);
      const errorInfo = makeErrorInfoObjForHttpException(UserService.name, "getUser", err);
      throw new HttpException(errorInfo, 200);
    }
  }

  async getAllUser() {
    try {
      const result = await this.userRepository.getAllUser();
      return result;
    } catch (err) {
      const errorInfo = makeErrorInfoObjForHttpException(UserService.name, "getAllUser", err);
      throw new HttpException(errorInfo, 200);
    }
  }

  async update(id: number, updateInfo: IUpdateUserInfo) {
    try {
      const prePassword = updateInfo.prePassword;
      const newPassword = updateInfo.password;
      const getUserById = await this.userRepository.getUserById(id);

      const validatePassword = await bcrypt.compare(prePassword, getUserById.password);
      if (!getUserById) {
        throw new Error("Unauthorized");
      }
      if (!validatePassword) {
        throw new Error("Wrong Password");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const result = await this.userRepository.updateUser(id, hashedPassword);
      return true;
    } catch (err) {
      const errorInfo = makeErrorInfoObjForHttpException(UserService.name, "update", err);
      throw new HttpException(errorInfo, 403);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
