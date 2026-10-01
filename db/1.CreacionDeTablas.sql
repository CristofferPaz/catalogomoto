SELECT 'CREATE DATABASE "catalogoMotos"'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'catalogoMotos')\gexec

\connect "catalogoMotos"

CREATE TABLE administrador (
    identificador INTEGER GENERATED ALWAYS AS IDENTITY,
    usuario VARCHAR(15),
    contrasena VARCHAR(60)
);

CREATE TABLE moto (
    identificador INTEGER GENERATED ALWAYS AS IDENTITY,
    modelo VARCHAR(50),
    marca VARCHAR(50),
    categoria VARCHAR(20),
    cilindrada INTEGER,
    precio NUMERIC(10, 2),
    imagenlink VARCHAR(500),
    stock INTEGER,
    descripcion VARCHAR(500)
);
