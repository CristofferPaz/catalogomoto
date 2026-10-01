import { z } from 'zod';

export const motoSchema = z.object({
  modelo: z.string().trim().min(1, 'El modelo es obligatorio').max(50),
  marca: z.literal('Power Motorcycle'),
  categoria: z.enum(['Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias']),
  cilindrada: z.coerce.number().int().nonnegative('Debe ser un valor positivo'),
  precio: z.coerce.number().nonnegative('Debe ser un valor positivo'),
  imagenLink: z.union([
    z.url('Ingresa una URL válida'),
    z.string().regex(/^\/images\/[A-Za-z0-9._/-]+$/, 'Usa una URL o una ruta /images/...'),
  ]),
  stock: z.coerce.number().int().nonnegative('No puede ser negativo'),
  descripcion: z.string().trim().min(1, 'La descripción es obligatoria').max(500, 'Máximo 500 caracteres'),
});
