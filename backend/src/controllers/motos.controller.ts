import type { Context } from 'hono';
import { createMotoSchema, idSchema, motoFiltersSchema, updateMotoSchema } from '../schemas/moto.schema.js';
import { createMoto, listMotos, updateMoto } from '../services/motos.service.js';
import { HttpError } from '../middlewares/error.middleware.js';

export async function listController(c: Context) {
  const parsed = motoFiltersSchema.safeParse(c.req.query());
  if (!parsed.success) throw new HttpError(400, 'Los filtros no son válidos', 'VALIDATION_ERROR');
  const data = await listMotos(parsed.data);
  return c.json({ data, total: data.length, filtros: parsed.data });
}

export async function createController(c: Context) {
  const parsed = createMotoSchema.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) throw new HttpError(400, 'Los datos enviados no son válidos', 'VALIDATION_ERROR');
  const data = await createMoto(parsed.data);
  return c.json({ data }, 201);
}

export async function updateController(c: Context) {
  const id = idSchema.safeParse(c.req.param('identificador'));
  const body = updateMotoSchema.safeParse(await c.req.json().catch(() => null));
  if (!id.success || !body.success) throw new HttpError(400, 'Los datos enviados no son válidos', 'VALIDATION_ERROR');
  const data = await updateMoto(id.data, body.data);
  if (!data) throw new HttpError(404, 'La moto no existe', 'NOT_FOUND');
  return c.json({ data });
}
