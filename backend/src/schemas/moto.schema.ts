import { z } from 'zod';
import { categorias } from '../types/moto.types.js';

const motoFields = {
  modelo: z.string().trim().min(1).max(50),
  marca: z.literal('Power Motorcycle').default('Power Motorcycle'),
  categoria: z.enum(categorias),
  cilindrada: z.coerce.number().int().nonnegative(),
  precio: z.coerce.number().nonnegative(),
  imagenLink: z.union([z.url(), z.string().regex(/^\/images\/[A-Za-z0-9._/-]+$/, 'La ruta local debe comenzar con /images/')]).pipe(z.string().max(500)),
  stock: z.coerce.number().int().nonnegative().default(0),
  descripcion: z.string().trim().min(1).max(500),
};

export const createMotoSchema = z.object(motoFields);
export const updateMotoSchema = createMotoSchema.partial().refine((value) => Object.keys(value).length > 0, 'Debe enviar al menos un campo');
export const motoFiltersSchema = z.object({
  modelo: z.string().trim().optional(), marca: z.string().trim().optional(), categoria: z.enum(categorias).optional(),
  cilindrada: z.coerce.number().int().nonnegative().optional(), precioMin: z.coerce.number().nonnegative().optional(),
  precioMax: z.coerce.number().nonnegative().optional(),
  stockDisponible: z.enum(['true', 'false']).transform((value) => value === 'true').optional(),
});

export const idSchema = z.coerce.number().int().positive();
