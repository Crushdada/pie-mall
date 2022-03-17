import { getGoodsCategories } from '@/api/goods/get-categories';
const categories = await getGoodsCategories();
const categoryDict = {
  headset: '耳机',
  router: '路由器',
  television: '数码电视',
  tablet_PC: '平板电脑',
  notebook_computer: '笔记本电脑',
  smart_home: '智能家居',
  mobile_phone: '智能手机',
  intelligent_watch: '智能手表',
  intelligent_speaker: '智能语音',
};
console.log('categories=', categories);
export const selectOptions = categories.map(item => ({
  lael: categoryDict[item],
  value: item,
}));
/**
 * GoodsInfoPage【新增商品】抽屉组件配置
 * @export AddGoodForm
 */
export const AddGoodForm = [
  // 分类
  {
    com: 'PSelect',
    label: '商品分类',
    modelName: 'G_category',
    modelVal: '',
    type: 'text',
    placeholder: '请选择商品分类',
    options: selectOptions,
    required: true,
  },
  // 商品信息
  {
    com: 'PInputPure',
    label: '商品介绍',
    modelName: 'G_info',
    modelVal: '',
    type: 'textarea',
    placeholder: '请填入商品信息',
    required: true,
  },
  // 价格
  {
    com: 'PInputPure',
    label: '商品价格',
    modelName: 'G_price',
    modelVal: '',
    type: 'number',
    required: true,
  },
  // 库存
  {
    com: 'PInputPure',
    label: '库存量',
    modelName: 'G_stock',
    modelVal: '',
    type: 'number',
    required: true,
  },
];
