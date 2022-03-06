export interface UserProfileInterface {
  id: string;
  account: string;
  password: string;
  avatar: string;
  [propName: string]: any;
}
