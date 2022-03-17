/**
 * UserPage【新增用户】抽屉组件配置
 * @export AddUserForm
 */
export const AddUserForm = [
  // 昵称
  {
    com: 'PInputPure',
    label: '用户昵称',
    modelName: 'name',
    modelVal: '',
    type: 'text',
  },
  // 角色
  {
    com: 'PSelect',
    label: '用户角色',
    modelName: 'role',
    modelVal: '',
    type: 'text',
    placeholder: '请选择用户角色',
    options: [
      { label: '普通用户', value: 'guest' },
      { label: 'vip贵宾', value: 'vip' },
    ],
  },
  // 账号
  {
    com: 'PInputPure',
    label: '用户账号',
    modelName: 'account',
    modelVal: '',
    type: 'text',
    required: true,
  },
  // 密码
  {
    com: 'PInputPure',
    label: '用户密码',
    modelName: 'password',
    modelVal: '',
    type: 'text',
    required: true,
    showPassword: true,
  },
  // 收货地址
  {
    com: 'PInputPure',
    label: '收货地址',
    modelName: 'address',
    modelVal: '',
    type: 'text',
    required: true,
  },
];
