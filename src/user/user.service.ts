import { HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";
import { ConfigService } from "@nestjs/config";
import { User } from "../entities/user.entity";
import { makeErrorInfoObjForHttpException } from "../global/globalErrorHandler";

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
      // return false;
      // const errorInfo = makeErrorInfoObjForHttpException(UserService.name, "verify", err);
      // throw new HttpException(errorInfo, 200);
      // throw new Error("Unauthorized");
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

      // making jwt token
      return { token: jwtToken };
    } catch (err) {
      console.log(err);
      const errorInfo = makeErrorInfoObjForHttpException(UserService.name, "login", err);
      throw new HttpException(errorInfo, 200);
    }
  }

  async getUser(userId: number) {
    try {
      const result = await this.userRepository.getUser(userId);

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
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
