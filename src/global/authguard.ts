import { Request } from "express";
import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { makeErrorInfoObjForHttpException } from "./globalErrorHandler";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request) {
    try {
      const jwtString = request.headers.authorization.split("Bearer ")[1];
      const result = await this.userService.verify(jwtString);

      if (!result) {
        console.log("VALIDATE EXCEPTION");
        throw new Error("JWT VALIDATE EXCEPTION");
      }
      return true;
    } catch (err) {
      const errorInfo = makeErrorInfoObjForHttpException(UserService.name, "verify", err);
      throw new HttpException(errorInfo, 401);
    }
  }
}
