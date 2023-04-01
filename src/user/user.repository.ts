import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async join(createUserDto: CreateUserDto) {
    const newUser = await this.dataSource.getRepository(User).create({ ...createUserDto });
    const saveUser = await this.dataSource.getRepository(User).save(newUser);
    return saveUser ? true : false;
  }

  async getUserByEmail(email: string) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder("User")
      .select("*")
      .where(`email = :email`, { email: email })
      .getRawOne();
  }

  async getUser(userId: number) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .select("id, email, is_driver")
      .where(`id = :id`, { id: userId })
      .getRawOne();
  }
}
