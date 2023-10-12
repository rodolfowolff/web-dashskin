export interface IResponseApi {
  response: {
    success: boolean,
    message: string,
    data: any,
  };
}

export interface IUserResponse {
  _id: string;
  username: string;
  email: string;
  age: number;
  avatar: string;
};