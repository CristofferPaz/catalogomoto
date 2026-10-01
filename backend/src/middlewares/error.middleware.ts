import type { ErrorHandler } from 'hono';
import { InvalidCredentialsError } from '../services/auth.service.js';

export class HttpError extends Error {
  constructor(public status: 400 | 401 | 404 | 500 | 503, message: string, public code = 'ERROR') { super(message); }
}

function isDatabaseError(error: unknown) {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code?: unknown }).code)
    : '';
  return ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', '28P01', '3D000', '42P01', '57P03'].includes(code);
}

export const errorMiddleware: ErrorHandler = (error, c) => {
  if (error instanceof InvalidCredentialsError) return c.json({ error: { codigo: 'INVALID_CREDENTIALS', mensaje: error.message, detalles: [] } }, 401);
  if (error instanceof HttpError) return c.json({ error: { codigo: error.code, mensaje: error.message, detalles: [] } }, error.status);
  if (isDatabaseError(error)) {
    console.error('PostgreSQL no disponible o no configurado:', error);
    return c.json({ error: { codigo: 'DATABASE_UNAVAILABLE', mensaje: 'No se pudo conectar con PostgreSQL. Verifica DATABASE_URL, el servicio y la base de datos.', detalles: [] } }, 503);
  }
  console.error(error);
  return c.json({ error: { codigo: 'INTERNAL_ERROR', mensaje: 'Ocurrió un error interno', detalles: [] } }, 500);
};
