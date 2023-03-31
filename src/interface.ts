export interface IResultReturn {
  result: "ok" | "fail";
  message: string | null;
  data: object | string | null;
}
