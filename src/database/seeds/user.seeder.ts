import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { User } from "../../entities/user.entity";

// export const dataSource = new DataSource({
//     // ... options ...
// })

// // load entities, establish db connection, sync schema, etc.
// await dataSource.connect()

export default class UserSeeder implements Seeder {
  //   constructor(private dataSource: DataSource) {}
  public async run(dataSource: DataSource): Promise<any> {
    // const userRepository = dataSource.getRepository(User);
    // await userRepository.insert([
    //   { id: 1, email: "guest@guest.com", password: "password", is_driver: false },
    //   { id: 2, email: "guest2@guest2.com", password: "password2", is_driver: true },
    // ]);
    // const reservationRepository = dataSource.getRepository(Reservation);
    // await reservationRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .values([
    //     {
    //       id: 1,
    //       start_location: "111.333.222",
    //       departure_location: "222.666.444",
    //       distance: "3",
    //       price: 30000,
    //       user: 1,
    //       reservation_status: "yet",
    //     },
    //   ]);
    // await this.dataSource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //     { id: 1, email: "guest@guest.com", password: "password", is_driver: false },
    //     { id: 2, email: "guest2@guest2.com", password: "password2", is_driver: true },
    //   ])
    //   .execute();
    // await this.dataSource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Reservation)
    //   .values([
    //     {
    //       id: 1,
    //       start_location: "111.333.222",
    //       departure_location: "222.666.444",
    //       distance: "3",
    //       price: 30000,
    //       user: 1,
    //       reservation_status: "yet",
    //     },
    //   ])
    //   .execute();
  }
}
