import { User } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class UserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getUser() {
    return await this.dataSource.getRepository(User).createQueryBuilder().select("*").getRawMany();
  }
}
