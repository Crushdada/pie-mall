import {
  ErrorResponse,
  SuccessResponse,
} from './../../../../types/response/response-body.interface';
import { Injectable } from '@nestjs/common';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { ErrorService } from './error/err-service';

@Injectable()
export class ResponseService {
  constructor(private readonly _errSrv: ErrorService) {}
  /**
   * 请求成功
   * @param {T} data
   * @returns { status, data, message }
   */
  public success<T>(data: T): SuccessResponse<T> {
    return {
      status: 0,
      message: 'success',
      data,
    };
  }

  /**
   * 请求失败的返回体
   * @param errorCode
   * @param data
   * @param options
   * @returns
   */
  public error<T>(
    errorCode: ERROR_TYPE,
    data: T,
    options?: {
      detail?: string;
    },
  ): ErrorResponse<T> {
    const error = this._errSrv.errInfo(errorCode);
    return {
      data,
      status: errorCode,
      error: error.message,
      detail: options?.detail,
      ...error,
    };
  }

  /**
   * 简化【DB操作代码段】的工具函数
   * @param cb 须try包裹的代码段
   * @returns res = cb();
   */
  public async tryExecute(cb) {
    try {
      return cb();
    } catch (err) {
      console.log(err.toString());
      return this.error(ERROR_TYPE.UNKNOW, err, {
        detail: err.toString(),
      });
    }
  }

  /**
   * 登录状态失效导致的请求失败的返回体
   * return ResponseBody<err>
   */
  sessionExpired(): ErrorResponse<any> {
    return this.error(ERROR_TYPE.NOT_FOUND, {
      detail: '🙈登录状态失效，请重新登录',
    });
  }
}
