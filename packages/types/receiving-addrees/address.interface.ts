export interface AddressInfo {
  /**
   * 收货地址
   */
  address: string;
  /**
   * 收货人
   */
  consignee_name: string;
  /**
   * 联系方式
   */
  phone: string;
  [propName: string]: any;
}
