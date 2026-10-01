import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
  // Supabase and other hosted PostgreSQL providers require SSL in development too.
  // `rejectUnauthorized: false` is appropriate here because the provider's
  // certificate chain is not guaranteed to be installed locally.
  ssl: { rejectUnauthorized: false },
});

export function getPool() { return pool; }
