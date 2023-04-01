import {IReservationLocation, IResultReturn} from "./interface";

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

/**
 * 입력받은 좌표 간의 거리 계산 함수
 * @param {object} [start] latitude, longitude 가지고 있는 obj
 * @param {object} [end] latitude, longitude 가지고 있는 obj
 */
export const distance: (start, end) => number = (start: IReservationLocation, end: IReservationLocation) => {
  let distance = 0;
  const x = (start.latitude - end.latitude) * 100000.0 * 0.884;
  const y = (start.longitude - end.longitude) * 100000.0 * 1.11;
  distance = Math.sqrt(x * x + y * y);

  return distance;
};
