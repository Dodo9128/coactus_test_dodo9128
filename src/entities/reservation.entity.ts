import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  start_location: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  departure_location: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  distance: string;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "customer_id" })
  @IsNotEmpty()
  customer: User;

  @OneToOne(() => User)
  @JoinColumn({ name: "driver_id" })
  driver: User;

  @Column({ type: "enum", name: "reservation_status", enum: ["yet", "selected", "confirm", "done"] })
  @IsString()
  reservation_status: string;

  @CreateDateColumn()
  start_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
