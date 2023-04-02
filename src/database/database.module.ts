import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get("DATABASE_TYPE"),
          host: configService.get("DATABASE_HOST"),
          port: +configService.get<number>("DATABASE_PORT"),
          username: configService.get("DATABASE_USERNAME"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_NAME"),
          entities: [__dirname + "/../entities/**.entity{.ts,.js}"],
          synchronize: JSON.parse(configService.get("DATABASE_SYNCHRONIZE")),
          //   synchronize: JSON.parse(configService.get("DATABASE_SYNCHRONIZE")),
          autoLoadEntities: true,
          logging: JSON.parse(configService.get("DATABASE_LOGGING")),
          keepConnectionAlive: true,
          charset: configService.get("DATABASE_CHARSET"),
          timezone: configService.get("DATABASE_TIMEZONE"),
        } as TypeOrmModuleAsyncOptions;
        // return {
        //   type: "mariadb",
        //   host: "localhost",
        //   port: 3306,
        //   username: "test",
        //   password: "testUser",
        //   database: "coacters_test",
        //   synchronize: false,
        //   entities: [__dirname + "/../entities/**.entity{.ts,.js}"],
        //   //   entities: [__dirname + "src/entities/*.entity{.ts,.js}"],
        //   autoLoadEntities: true,
        //   Logging: true,
        //   keepConnectionAlive: true,
        //   charset: "utf8mb4_unicode_ci",
        //   timezone: "+09:00",
        // } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
