# Frontend del catálogo de motos

Frontend en Astro, TypeScript, Tailwind CSS y Zod. Consume la API Hono del directorio `backend`.

El proyecto utiliza Astro en modo completamente estático (`output: static`) y es compatible con Vercel sin adaptador SSR. Vercel publica el directorio `dist` generado durante el build.

## Uso

```bash
npm install
copy .env.example .env
npm run dev
```

Configura `PUBLIC_API_URL` con la URL del backend. El cliente guarda `auth_token` y `admin_user` en `localStorage` y envía `Authorization: Bearer <token>` en operaciones protegidas. También mantiene `credentials: include` para compatibilidad con la cookie del backend.

En Vercel configura `PUBLIC_API_URL` como variable de entorno de producción, por ejemplo:

```env
PUBLIC_API_URL=https://tu-backend.vercel.app
```

Las llamadas al backend se ejecutan únicamente en el navegador, por lo que no se requiere conexión al backend durante `npm run build`.

No se utilizan banners. Las tarjetas muestran exclusivamente los diez modelos del catálogo con imágenes oficiales individuales en `public/images/motos/`.
