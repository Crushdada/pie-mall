import { IsString } from 'class-validator';

/**
 * 后台添加用户DTO
 */
export class addGuestDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  account: string;

  @IsString()
  password: string;

  @IsString()
  address: string;
}
