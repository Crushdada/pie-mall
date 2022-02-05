import { IsString, IsUrl } from 'class-validator';
/**
 * 商品数据批量入库
 */
export class AddGoodsDto {
  @IsString()
  readonly G_category: string;

  @IsUrl(
    {
      protocols: ['http', 'https'],
      require_protocol: true,
    },
    {
      message: '图片资源地址不合法',
    },
  )
  readonly G_thumb: string;

  @IsString()
  readonly G_info: string;

  @IsString()
  readonly G_price: string;
}
