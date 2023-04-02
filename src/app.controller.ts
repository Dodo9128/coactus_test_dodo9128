import { Controller, Get } from "@nestjs/common";
// import { AppService } from "./app.service";

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "coacters test_dodo9128";
    // return this.appService.getHello();
  }
}
