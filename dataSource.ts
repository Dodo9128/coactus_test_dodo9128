import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from "@nestjs/common/module-utils/constants";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { async } from "rxjs";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";

export default new DataSource({
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "testUser",
  database: "coacters_test",
  synchronize: false,
  entities: ["src/**/*.entity.ts"],
  //   entities: [__dirname + "src/entities/*.entity{.ts,.js}"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
} as DataSourceOptions);

// async () => {
//   const options: DataSourceOptions & SeederOptions = {
//     type: "mariadb",
//     host: "localhost",
//     port: 3306,
//     username: "test",
//     password: "testUser",
//     database: "coacters_test",
//     synchronize: false,
//     entities: ["src/**/*.entity.ts"],
//     //   entities: [__dirname + "src/entities/*.entity{.ts,.js}"],
//     migrations: ["src/database/migrations/*.ts"],
//     migrationsTableName: "migrations",
//   };

//   const dataSource = new DataSource(options);

//   await dataSource.initialize();

//   console.log(dataSource);

//   runSeeders(dataSource, {
//     seeds: ["src/database/seeds/**/*{.ts,.js}"],
//     factories: ["src/database/factories/**/*{.ts,.js}"],
//   });
// };

// config();

// const configService = new ConfigService();

// export default new DataSource({
//   type: "mariadb",
//   host: configService.get("DATABASE_HOST"),
//   port: configService.get<number>("DATABASE_PORT"),
//   username: configService.get("DATABASE_USERNAME"),
//   password: configService.get("DATABASE_PASSWORD"),
//   database: configService.get("DATABASE_NAME"),
//   synchronize: false,
//   entities: ["src/**/*.entity.ts"],
//   migrations: ["src/database/migrations/*.ts"],
//   migrationsTableName: "migrations",
// } as DataSourceOptions).initialize();

// console.log(process.env.DATABASE);

// export default new DataSource({
//   type: (process.env.DATABASE_TYPE as string) || "mariadb",
//   host: process.env.DATABASE_HOST as string,
//   port: parseInt(process.env.DATABASE_PORT as string, 10) || 3306,
//   username: (process.env.DATABASE_USERNAME as string) || "ims",
//   password: process.env.DATABASE_PASSWORD as string,
//   database: process.env.DATABASE_NAME as string,
//   entities: [__dirname + "/../entities/*.entity{.ts,.js}"],
//   synchronize: JSON.parse(process.env.DATABASE_SYNCHRONIZE as string) || false,
//   logging: JSON.parse(process.env.DATABASE_LOGGING as string) || true,
//   charset: process.env.DATABASE_CHARSET as string,
//   timezone: (process.env.DATABASE_TIMEZONE as string) || "+09:00",
// } as DataSourceOptions);
