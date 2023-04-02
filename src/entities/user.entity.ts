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
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Reservation } from "./reservation.entity";

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
  //
  // @OneToMany(type => Reservation, reservation => reservation.customer)
  // @JoinColumn()
  // customer_reservation: Reservation[];
  //
  // @OneToMany(type => Reservation, reservation => reservation.driver)
  // @JoinColumn()
  // driver_reservation: Reservation[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
