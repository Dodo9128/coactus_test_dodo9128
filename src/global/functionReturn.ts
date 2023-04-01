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

/**
 * current Timezone timestamp maker
 *
 * @return "YYYY-MM-DD HH:mm:ss"
 */
export const currentTimeMaker = () => {
  const offset = new Date().getTimezoneOffset() * 60000;

  const currentTime = new Date(new Date().getTime() - offset).toISOString();

  return `${currentTime.substring(0, 10)} ${currentTime.substring(11, 19)}`;
};
