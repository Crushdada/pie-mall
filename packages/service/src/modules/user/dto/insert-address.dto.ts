import { IsString, IsMobilePhone } from 'class-validator';

/**
 * 用户信息增量更新DTO
 */
export class insertAddressDto {
  @IsString()
  address: string;
  
  @IsString()
  consignee_name: string;

  @IsMobilePhone()
  phone: string;
}
