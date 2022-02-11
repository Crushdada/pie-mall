import { IsString } from 'class-validator';
/**
 * 商品数据批量入库
 */
export class SignDto {
  @IsString()
  readonly account: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly signType: string;
}
