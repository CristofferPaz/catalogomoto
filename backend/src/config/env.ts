import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),
  COOKIE_NAME: z.string().min(1).default('auth_token'),
  BCRYPT_ROUNDS: z.coerce.number().int().min(4).max(15).default(8),
  FRONTEND_URL: z.string().url().default('http://localhost:4321'),
  CORS_ORIGINS: z.string().default('http://localhost:4321,http://127.0.0.1:4321'),
});

export const env = envSchema.parse(process.env);
