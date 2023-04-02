import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { currentTimeMaker, sendFail } from "./functionReturn";
import { LoggerService } from "../config/winstonConfiguration";
import * as ip from "ip";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  logger = new LoggerService("globalException");
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionObj = exception.getResponse();

    let serviceName;
    let serviceFunc;
    let errorObj;
    const timestamp = currentTimeMaker();

    // global endpoint exception filter
    if (exceptionObj["statusCode"] === 404) {
      serviceName = `${exceptionObj["error"]}`;
      serviceFunc = request.url;
      errorObj = { message: exceptionObj["message"] };
    }
    // class-validator 를 위한 error format
    else if (exceptionObj["statusCode"] === 400) {
      serviceName = `Validation Error : ${exceptionObj["error"]}`;
      serviceFunc = request.url;
      // 2개 이상의 validation 체크 시 우선되는 1개의 에러만 return 하기 위함
      errorObj = { message: exceptionObj["message"][0] };
    } else {
      serviceName = exceptionObj["service"];
      serviceFunc = exceptionObj["name"];
      errorObj = exceptionObj["error"];
    }

    const myIp = ip.address();

    this.logger.httpException(serviceName, serviceFunc, errorObj, status, timestamp);

    // seperate to global endpoint exception
    if (status !== 404 && request.url !== "/favicon.ico") {
      response
        .status(status)
        // .json({
        //   statusCode: status,
        //   timestamp: new Date().toISOString(),
        //   path: request.url,
        // });
        .json(sendFail(errorObj.message, null));
    } else {
      response.status(HttpStatus.NOT_FOUND).json(sendFail(errorObj.message, null));
      // global endpoint exception redirect to home
      // .redirect(308, `${process.env.MY_ADDRESS}:${process.env.SERVER_PORT}`);
    }
  }
}

/**
 * error 객체 생성하는 함수
 * @param {string} service 에러가 발생한 서비스 이름
 * @param {string} name 에러가 발생한 서비스 내부 함수 이름
 * @param {object} errorObj 에러 객체 (error 객체의 stack이 들어 있다)
 * @param {string} message 존재할 시 해당 Error의 Error Message를 커스텀한다
 */
export function makeErrorInfoObjForHttpException(service: string, name: string, errorObj: object, message?: string) {
  return {
    service: service,
    name: name,
    error: errorObj,
    message: message,
  };
}
