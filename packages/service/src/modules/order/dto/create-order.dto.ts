import { IsInt, IsString } from 'class-validator';
/**
 * Order DTO
 */
export class CreateOrderDto {
  @IsString()
  readonly G_category: string;

  readonly G_thumb: Express.Multer.File;

  @IsString()
  readonly G_info: string;

  @IsInt()
  readonly G_price: number;
  /**
   * 商品库存
   */
  @IsInt()
  readonly G_stock: number;
}
