import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async join(createUserDto: CreateUserDto) {
    // bcrypt hash & send true || false
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const result = await this.userRepository.join(createUserDto);
    return result;
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
