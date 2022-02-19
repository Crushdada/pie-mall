import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms';
/**
 * 基于@nestjs/jwt的登录认证服务
 * 主要包含登录 access_token / ticket 的签发行为
 * @export
 * @class JwtAuthService
 */
@Injectable()
export class JwtAuthService {
  constructor(private readonly _jwtSrv: JwtService) {}

  /**
   * 签发 token
   * @param {string} userId
   * @returns {Promise<string>}
   * @memberof JwtAuthService
   */
  async signAccessToken(userId: string): Promise<string> {
    return this._jwtSrv.signAsync(userId);
  }

  /**
   * 验证 token
   * @param {string} token
   * @returns {Promise<string>} when verify success, null when failed
   * @memberof JwtAuthService
   */
  async verifyAccessToken(token: string): Promise<string> {
    const res = this._jwtSrv.verifyAsync(token, {
      ignoreExpiration: false,
    });
    return res;
  }
}
