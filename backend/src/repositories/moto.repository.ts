import { getPool } from '../database/postgresql.js';
import type { Moto } from '../types/moto.types.js';

export type MotoInput = Omit<Moto, 'identificador'>;
export type MotoFilters = {
  modelo?: string; marca?: string; categoria?: Moto['categoria']; cilindrada?: number;
  precioMin?: number; precioMax?: number; stockDisponible?: boolean;
};

const columns = `identificador AS "identificador", modelo AS "modelo", marca AS "marca",
  categoria AS "categoria", cilindrada AS "cilindrada", precio AS "precio",
  imagenlink AS "imagenLink", stock AS "stock", descripcion AS "descripcion"`;

export async function create(input: MotoInput): Promise<Moto> {
  const result = await getPool().query<Moto>(`INSERT INTO moto
    (modelo, marca, categoria, cilindrada, precio, imagenlink, stock, descripcion)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING ${columns}`, [input.modelo, input.marca, input.categoria, input.cilindrada,
    input.precio, input.imagenLink, input.stock, input.descripcion]);
  return result.rows[0];
}

export async function update(identificador: number, input: Partial<MotoInput>): Promise<Moto | undefined> {
  const values: Array<unknown> = [];
  const fields: string[] = [];
  const allowed: Array<keyof MotoInput> = ['modelo', 'marca', 'categoria', 'cilindrada', 'precio', 'imagenLink', 'stock', 'descripcion'];
  const columnNames: Record<keyof MotoInput, string> = {
    modelo: 'modelo', marca: 'marca', categoria: 'categoria', cilindrada: 'cilindrada',
    precio: 'precio', imagenLink: 'imagenlink', stock: 'stock', descripcion: 'descripcion',
  };
  for (const field of allowed) {
    if (input[field] !== undefined) {
      values.push(input[field]);
      fields.push(`${columnNames[field]} = $${values.length}`);
    }
  }
  values.push(identificador);
  const result = await getPool().query<Moto>(`UPDATE moto SET ${fields.join(', ')}
    WHERE identificador = $${values.length}
    RETURNING ${columns}`, values);
  return result.rows[0];
}

export async function list(filters: MotoFilters): Promise<Moto[]> {
  const values: Array<unknown> = [];
  const conditions: string[] = [];
  const add = (value: unknown, condition: string) => { values.push(value); conditions.push(condition.replace('?', `$${values.length}`)); };
  if (filters.modelo) add(`%${filters.modelo}%`, 'modelo ILIKE ?');
  if (filters.marca) add(filters.marca, 'marca = ?');
  if (filters.categoria) add(filters.categoria, 'categoria = ?');
  if (filters.cilindrada !== undefined) add(filters.cilindrada, 'cilindrada = ?');
  if (filters.precioMin !== undefined) add(filters.precioMin, 'precio >= ?');
  if (filters.precioMax !== undefined) add(filters.precioMax, 'precio <= ?');
  if (filters.stockDisponible === true) conditions.push('stock > 0');
  if (filters.stockDisponible === false) conditions.push('stock = 0');
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const result = await getPool().query<Moto>(`SELECT ${columns} FROM moto ${where} ORDER BY identificador`, values);
  return result.rows;
}
