export interface ISignIn {
  username: string;
  password: string;
}

export interface iPayload {
  id: number;
  name: string;
  username: string;
  iat: number;
  exp: number;
}
