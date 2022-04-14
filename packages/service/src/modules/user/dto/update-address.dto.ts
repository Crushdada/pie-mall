import { IsString } from 'class-validator';
import { insertAddressDto } from './insert-address.dto';
/**
 * 用户新增收货地址DTO
 */
export class updateAddressDto extends insertAddressDto {
  @IsString()
  id: string;
}
