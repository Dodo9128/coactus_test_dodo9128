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
      .createQueryBuilder()
      .select("*")
      .where(`email = :email`, { email: email })
      .getRawOne();
  }

  async getUserByEmailWithoutPassword(email: string) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .select("id, email, is_driver, created_at")
      .where(`email = :email`, { email: email })
      .getRawOne();
  }

  async getUserById(userId: number) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .select("*")
      .where(`id = :id`, { id: userId })
      .getRawOne();
  }

  async getUserByIdWithoutPassword(userId: number) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .select("id, email, is_driver, created_at")
      .where(`id = :id`, { id: userId })
      .getRawOne();
  }

  async getAllUser() {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .select(`id, email, is_driver, created_at`)
      .getRawMany();
  }

  async updateUser(userId, password) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .update<User>(User, { password: password })
      .where(`id = :id`, { id: userId })
      // .returning(`id, email`)
      // .updateEntity(true)
      .execute();
  }
}
