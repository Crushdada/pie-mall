/* jshint esversion: 6 */

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
    options: [],
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
