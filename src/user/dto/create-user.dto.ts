import { User } from "../../entities/user.entity";
import { PartialType } from "@nestjs/swagger";
import { IsString, IsBoolean } from "class-validator";

export class CreateUserDto extends PartialType(User) {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_driver: boolean;
}
