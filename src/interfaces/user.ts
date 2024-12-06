 export interface IUser {
  name?: string;
  email: string;
  password: string;
}
export interface IUserResultUpdate {
  id: string;
  name: string;
  email: string;
}
export interface IUpdateUserResponse {
  success: boolean;
  data?: IUser;
  message: string;
}
