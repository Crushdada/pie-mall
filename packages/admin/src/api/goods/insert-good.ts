import axios from 'axios';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { GoodsInterface } from '../../../../types/goods/goods.interface';
/**
 * 用于后台单个新增商品
 * @param goodData
 */
export const insertGood = async (
  goodData: Partial<GoodsInterface>,
): Promise<ResponseBody<any>> => {
  const res = await axios.post(
    `${process.env.SERVICE_BASE_URL}goods/atom`,
    goodData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return res.data;
};
