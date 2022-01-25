import { ERROR_TYPE } from "./error-type.enum";

export interface SuccessResponse<T> {
  status: number;
  data: T;
  message?: string;
}

export interface ErrorResponse<T> {
  status: ERROR_TYPE;
  data: T;
  message?: string;
  detail?: string;
  error: string;
}

export type ResponseBody<T> = SuccessResponse<T> | ErrorResponse<T>;
