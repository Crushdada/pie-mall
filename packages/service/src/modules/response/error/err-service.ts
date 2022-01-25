import { Injectable } from '@nestjs/common';
import { ERROR_TYPE } from '../../../../../types/response/error-type.enum';

@Injectable()
export class ErrorService {
    private _errorTypes: Partial<Record<ERROR_TYPE, { message: string }>> = {};
    constructor() {
        this._errorTypes[ERROR_TYPE.UNKNOW] = { message: '发生未知错误' };
        this._errorTypes[ERROR_TYPE.NOT_FOUND] = { message: '无法找到指定的资源' };
        this._errorTypes[ERROR_TYPE.UNAUTHORIZED] = { message: '没有指定权限' };
    }
    public errInfo(errCode: number): { message: string } {
        return this._errorTypes[errCode];
    }
}
