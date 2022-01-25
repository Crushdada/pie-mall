import { ErrorResponse, SuccessResponse } from './../../../../types/response/response-body.interface';
import { Injectable } from '@nestjs/common';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { ErrorService } from './error/err-service';

@Injectable()
export class ResponseService {
    constructor(private readonly _errSrv: ErrorService) { }
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
}
