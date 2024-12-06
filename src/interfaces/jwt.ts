import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadCustom extends JwtPayload {
  userDataJWT: {
    id: string;
    name: string;
    email: string;
  };
  iat: number
  exp: number
}
