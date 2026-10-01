import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from './config/env.js';
import { authRoutes } from './routes/auth.routes.js';
import { motoRoutes } from './routes/motos.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const app = new Hono();
app.onError(errorMiddleware);

const allowedOrigins = new Set([
  ...env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
  env.FRONTEND_URL,
]);

app.use('*', cors({
  origin: (origin) => allowedOrigins.has(origin) ? origin : '',
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
}));
app.get('/', (c) => c.json({ mensaje: 'API de catálogo de motos funcionando' }));
app.route('/api/auth', authRoutes);
app.route('/api/motos', motoRoutes);

export default app;
