import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty, IsBoolean } from "class-validator";
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column("bool")
  @IsNotEmpty()
  @IsBoolean()
  is_driver: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
