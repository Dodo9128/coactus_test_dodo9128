import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  // imports: [
  //     TypeOrmModule.forRootAsync({
  //     })
  // ]
})
export class DatabaseModule {}
