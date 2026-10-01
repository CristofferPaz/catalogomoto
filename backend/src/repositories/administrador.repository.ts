import { getPool } from '../database/postgresql.js';

export type AdministradorRecord = {
  identificador: number;
  usuario: string;
  contrasena: string;
};

export async function findByUsuario(usuario: string): Promise<AdministradorRecord | undefined> {
  const result = await getPool().query<AdministradorRecord>(`
    SELECT identificador, usuario, contrasena
    FROM administrador
    WHERE usuario = $1
  `, [usuario]);
  return result.rows[0];
}
