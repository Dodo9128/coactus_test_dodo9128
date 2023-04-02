// core
import { Injectable, NestMiddleware } from "@nestjs/common";

// logger
import { LoggerService } from "../config/winstonConfiguration";

// lib
import { Request, Response, NextFunction } from "express";
import { currentTimeMaker } from "./functionReturn";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    const startTime = process.hrtime();
    const loggerService = new LoggerService(req.url);
    const tempUrl = req.method + " " + req.url.split("?")[0];
    const _headers = req.headers ? req.headers : {};
    const _query = req.query ? req.query : {};
    const _body = req.body ? req.body : {};
    const _url = tempUrl ? tempUrl : {};
    const _timestamp = currentTimeMaker();

    loggerService.info(
      JSON.stringify({
        url: _url,
        headers: _headers,
        query: _query,
        body: _body,
        timestamp: _timestamp,
      }),
    );

    await next();
    // API_EXECUTE_TIME 에 여기서 insert?
    const endTime = process.hrtime(startTime);
    // TODO: add API_EXECUTE_TIME
    console.log(endTime[0], endTime[1]);
  }
}
