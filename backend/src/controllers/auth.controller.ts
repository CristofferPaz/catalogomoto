import type { Context } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { env } from '../config/env.js';
import { loginSchema } from '../schemas/auth.schema.js';
import { login } from '../services/auth.service.js';
import { HttpError } from '../middlewares/error.middleware.js';

export async function loginController(c: Context) {
  const parsed = loginSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) throw new HttpError(400, 'Los datos enviados no son válidos', 'VALIDATION_ERROR');
  const result = await login(parsed.data.usuario, parsed.data.contrasena);
  setCookie(c, env.COOKIE_NAME, result.token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/',
    maxAge: 3600,
  });
  return c.json({ mensaje: 'Inicio de sesión exitoso', usuario: result.user.usuario, token: result.token });
}

export function logoutController(c: Context) {
  deleteCookie(c, env.COOKIE_NAME, { path: '/' });
  return c.json({ mensaje: 'Sesión cerrada correctamente' });
}
