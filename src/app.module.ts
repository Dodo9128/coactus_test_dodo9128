import configuration from "./config/configuration";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { NestModule, Module, ValidationPipe, MiddlewareConsumer } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AppController } from "./app.controller";
// import { AppService } from "./app.service";

const node_env = process.env.NODE_ENV || "development";

let envPath = "";
switch (node_env) {
  case "development":
    envPath = ".env.development";
    break;
  case "production":
    envPath = ".env.production";
    break;
  case "local":
    envPath = ".env.local";
    break;
  case "test":
    envPath = ".env.test";
    break;

  default:
    envPath = ".env.development";
}

console.log(`Node Version: ${process.version}`);
console.log(`Environment Path is: ${envPath}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    ConfigService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
