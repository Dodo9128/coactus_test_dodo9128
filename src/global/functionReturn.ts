import { IResultReturn } from "./interface";

export const sendOk = (msg: string, data: any) => {
  const returnObject: IResultReturn = {
    result: "ok",
    message: msg,
    data: data,
  };
  return returnObject;
};

export const sendFail = (msg: string, data: any) => {
  const returnObject: IResultReturn = {
    result: "fail",
    message: msg,
    data: data,
  };
  return returnObject;
};