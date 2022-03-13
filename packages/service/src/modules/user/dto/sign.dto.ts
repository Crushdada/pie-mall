import { IsString } from 'class-validator';
/**
 * 用户登录/注册 DTO
 */
export class SignDto {
  @IsString()
  readonly account: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly signType: string;
}
