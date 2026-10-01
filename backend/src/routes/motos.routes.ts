import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createController, listController, updateController } from '../controllers/motos.controller.js';

export const motoRoutes = new Hono();
motoRoutes.get('/', listController);
motoRoutes.post('/', authMiddleware, createController);
motoRoutes.put('/:identificador', authMiddleware, updateController);
