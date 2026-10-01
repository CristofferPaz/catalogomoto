# Backend del catálogo de motos

API REST en TypeScript, Hono y PostgreSQL. La aplicación exporta la instancia de Hono como `default` desde `src/index.ts`, por lo que puede ejecutarse como Vercel Function con runtime Node.js.

Los scripts de `../db` deben ejecutarse con `psql` en este orden: creación, restricciones e inserción. La contraseña inicial del administrador ya está almacenada como hash bcrypt en el script de inserción; el seed también puede utilizarse para regenerarla.

## Inicio local

```bash
npm install
copy .env.example .env
npm run dev
```

También puede probarse con `vc dev` desde este directorio. El archivo `.env` real no debe subirse al repositorio.

## Seed del administrador

El seed genera el hash con bcrypt antes de guardarlo. Configura `SEED_ADMIN_USER` y `SEED_ADMIN_PASSWORD` en el entorno y ejecuta:

```bash
npx tsx src/database/seed-admin.ts
```

No uses una contraseña en texto plano en producción. El seed usa ocho saltos por defecto (`BCRYPT_ROUNDS=8`).

Para una aplicación frontend desplegada en otro dominio, configura `FRONTEND_URL` y conserva `credentials: include` en el cliente. En producción la cookie utiliza `SameSite=None` y `Secure` para permitir la sesión entre dominios HTTPS.

## Rutas

- `GET /` — estado de la API.
- `POST /api/auth/login` — inicia sesión y establece cookie JWT HttpOnly.
- `POST /api/auth/logout` — elimina la cookie.
- `GET /api/motos` — lista y filtra motos.
- `POST /api/motos` — registra una moto; requiere JWT.
- `PUT /api/motos/:identificador` — actualiza una moto; requiere JWT.

Todas las consultas a SQL Server utilizan parámetros. Las contraseñas nunca se incluyen en las respuestas.
