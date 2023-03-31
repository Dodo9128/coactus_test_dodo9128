import { User } from "../../entities/user.entity";
import { PartialType } from "@nestjs/swagger";

export class CreateUserDto extends PartialType(User) {

}
