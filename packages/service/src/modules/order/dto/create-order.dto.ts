import { IsInt, IsString } from 'class-validator';
/**
 * Order DTO
 */
export class CreateOrderDto {
  @IsString()
  address: string;
}
