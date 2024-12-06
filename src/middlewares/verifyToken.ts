import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayloadCustom } from '../interfaces/jwt'
import { getUserById } from '../models/userModel'

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.status(401).send('Token não fornecido.');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayloadCustom;
    const userId = decoded.userDataJWT.id
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    if (!user.auth_status) {
      return res.status(403).send('Acesso negado.');
    }

    req.body.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send('Token inválido.');
  }
}
