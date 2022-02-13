/**
 * B端管理员角色类型
 * @enum {*} string
 */
export enum AdminRole {
  SUPER_USER = 'super_user', // 超级管理员
  ADMIN = 'admin',
}

/**
 * C端用户角色类型
 * @enum {*} string
 */
export enum GuestRole {
  VIP_GUEST = 'vip_guest', // vip
  GUEST = 'guest',
}
