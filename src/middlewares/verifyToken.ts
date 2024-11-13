import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    res.status(401).send('Token não fornecido.');
    return;
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      console.log(err);
      res.status(401).json('Token inválido.');
      return;
    }

    req.body.user = decoded.user;

    next();
  });
}
