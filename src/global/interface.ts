export interface IResultReturn {
  result: "ok" | "fail";
  message: string | null;
  data: object | string | null;
}

export interface IUpdateUserInfo {
  prePassword: string;
  password: string;
}

export interface IReservationLocation {
  latitude: number;
  longitude: number;
}