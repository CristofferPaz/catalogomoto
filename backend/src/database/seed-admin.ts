import bcrypt from 'bcrypt';
import { env } from '../config/env.js';
import { getPool } from './postgresql.js';

const usuario = process.env.SEED_ADMIN_USER ?? 'sabino007';
const contrasena = process.env.SEED_ADMIN_PASSWORD ?? 'sabino007232';

const hash = await bcrypt.hash(contrasena, env.BCRYPT_ROUNDS);
const pool = await getPool();
await pool.query(`INSERT INTO administrador (usuario, contrasena)
  VALUES ($1, $2)
  ON CONFLICT (usuario) DO UPDATE SET contrasena = EXCLUDED.contrasena`, [usuario, hash]);
console.log(`Administrador ${usuario} preparado con bcrypt (${env.BCRYPT_ROUNDS} saltos).`);
