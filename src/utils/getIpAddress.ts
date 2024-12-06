import { Request } from 'express';

export function getIpAddress(req: Request): string {
  const ip =
    (Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for']) ||
    req.ip ||
    req.connection.remoteAddress;

  return ip || '0.0.0.0';
}
