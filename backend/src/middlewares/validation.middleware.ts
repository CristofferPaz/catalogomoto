import type { Context } from 'hono';

export function validationError(c: Context) {
  return c.json({ error: { codigo: 'VALIDATION_ERROR', mensaje: 'Los datos enviados no son válidos', detalles: [] } }, 400);
}
