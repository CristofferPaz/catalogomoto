\connect "catalogoMotos"

/* Claves primarias y restricciones de obligatoriedad */
ALTER TABLE administrador ALTER COLUMN identificador SET NOT NULL;
ALTER TABLE administrador ALTER COLUMN usuario SET NOT NULL;
ALTER TABLE administrador ALTER COLUMN contrasena SET NOT NULL;
ALTER TABLE administrador ADD CONSTRAINT pk_administrador PRIMARY KEY (identificador);

ALTER TABLE moto ALTER COLUMN identificador SET NOT NULL;
ALTER TABLE moto ALTER COLUMN modelo SET NOT NULL;
ALTER TABLE moto ALTER COLUMN marca SET NOT NULL;
ALTER TABLE moto ALTER COLUMN categoria SET NOT NULL;
ALTER TABLE moto ALTER COLUMN cilindrada SET NOT NULL;
ALTER TABLE moto ALTER COLUMN precio SET NOT NULL;
ALTER TABLE moto ALTER COLUMN imagenlink SET NOT NULL;
ALTER TABLE moto ALTER COLUMN stock SET NOT NULL;
ALTER TABLE moto ALTER COLUMN descripcion SET NOT NULL;
ALTER TABLE moto ADD CONSTRAINT pk_moto PRIMARY KEY (identificador);

/* Restricciones CHECK */
ALTER TABLE administrador ADD CONSTRAINT ck_administrador_usuario
    CHECK (char_length(usuario) <= 15);
ALTER TABLE administrador ADD CONSTRAINT ck_administrador_contrasena
    CHECK (char_length(contrasena) <= 60);
ALTER TABLE moto ADD CONSTRAINT ck_moto_marca
    CHECK (marca = 'Power Motorcycle');
ALTER TABLE moto ADD CONSTRAINT ck_moto_categoria
    CHECK (categoria IN ('Automaticas', 'Aventura', 'Deportiva', 'Scoter', 'utilitarias'));
ALTER TABLE moto ADD CONSTRAINT ck_moto_cilindrada
    CHECK (cilindrada >= 0);
ALTER TABLE moto ADD CONSTRAINT ck_moto_precio
    CHECK (precio >= 0);
ALTER TABLE moto ADD CONSTRAINT ck_moto_stock
    CHECK (stock >= 0);

/* Restricciones DEFAULT */
ALTER TABLE moto ALTER COLUMN marca SET DEFAULT 'Power Motorcycle';
ALTER TABLE moto ALTER COLUMN stock SET DEFAULT 0;
