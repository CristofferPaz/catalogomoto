import type { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import { env } from '../config/env.js';
import { verifyToken } from '../services/auth.service.js';
import { HttpError } from './error.middleware.js';
import type { AuthUser } from '../types/auth.types.js';

export const authMiddleware: MiddlewareHandler<{ Variables: { user: AuthUser } }> = async (c, next) => {
  const authorization = c.req.header('Authorization');
  const bearerToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : undefined;
  const token = bearerToken ?? getCookie(c, env.COOKIE_NAME);
  if (!token) throw new HttpError(401, 'Autenticación requerida', 'UNAUTHORIZED');
  try { c.set('user', verifyToken(token)); } catch { throw new HttpError(401, 'Token inválido o expirado', 'UNAUTHORIZED'); }
  await next();
};
