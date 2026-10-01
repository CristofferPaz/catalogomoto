import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { findByUsuario } from '../repositories/administrador.repository.js';
import type { AuthUser } from '../types/auth.types.js';

export class InvalidCredentialsError extends Error {}

export async function login(usuario: string, contrasena: string): Promise<{ user: AuthUser; token: string }> {
  const admin = await findByUsuario(usuario);
  if (!admin || !(await bcrypt.compare(contrasena, admin.contrasena))) throw new InvalidCredentialsError('Credenciales inválidas');
  const user = { identificador: admin.identificador, usuario: admin.usuario };
  const token = jwt.sign(user, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
  return { user, token };
}

export function verifyToken(token: string): AuthUser {
  const payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload & AuthUser;
  if (typeof payload.identificador !== 'number' || typeof payload.usuario !== 'string') throw new Error('Token inválido');
  return { identificador: payload.identificador, usuario: payload.usuario };
}
