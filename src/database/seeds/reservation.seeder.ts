import { Reservation } from "src/entities/reservation.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
//
// export default class ReservationSeeder implements Seeder {
//   //   constructor(private dataSource: DataSource) {}
//   public async run(dataSource: DataSource): Promise<any> {
//     const reservationRepository = dataSource.getRepository(Reservation);
//     await reservationRepository
//       .createQueryBuilder()
//       .insert()
//       .values([
//         {
//           id: 1,
//           start_location: "111.333.222",
//           departure_location: "222.666.444",
//           distance: "3",
//           price: 30000,
//           user: 1,
//           reservation_status: "yet",
//         },
//       ]);
//   }
// }
