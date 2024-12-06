import { Request } from 'express';

export function getIpAddress(req: Request): string {
  const ip =
    (Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for']) ||
    req.ip ||
    req.connection.remoteAddress;

  // Converte ::1 para 127.0.0.1
  const normalizedIp = ip === '::1' ? '127.0.0.1' : ip;

  return normalizedIp || '0.0.0.0';
}
