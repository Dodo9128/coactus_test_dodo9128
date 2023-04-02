import { IReservationLocation } from "../../global/interface";

export class CreateReservationDto {
  id: number;
  email: string;
  is_driver: boolean;
  start_location: IReservationLocation;
  end_location: IReservationLocation;
}
