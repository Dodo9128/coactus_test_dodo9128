import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async join(createUserDto: CreateUserDto) {
    // const result = await this.dataSource
    //   .getRepository(User)
    //   .createQueryBuilder()
    //   .insert()
    //   .values([
    //     {
    //       email: createUserDto.email,
    //       password: createUserDto.password,
    //       is_driver: createUserDto.is_driver,
    //     },
    //   ]);
    // return result ? true : false;
    // return await this.dataSource
    //   .getRepository(User)
    //   .createQueryBuilder()
    //   .insert()
    //   .values([
    //     {
    //       email: createUserDto.email,
    //       password: createUserDto.password,
    //       is_driver: createUserDto.is_driver,
    //     },
    //   ]);
    // return await this.dataSource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //     {
    //       email: createUserDto.email,
    //       password: createUserDto.password,
    //       is_driver: createUserDto.is_driver,
    //     },
    //   ]);
    const newUser = await this.dataSource.getRepository(User).create({ ...createUserDto });
    const saveUser = await this.dataSource.getRepository(User).save(newUser);
    return saveUser ? true : false;
  }

  async getUser() {
    return await this.dataSource.getRepository(User).createQueryBuilder().select("*").getRawMany();
  }
}
