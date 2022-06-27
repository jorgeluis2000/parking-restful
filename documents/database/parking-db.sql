-- ALTER TABLE "Default"."factura" DROP CONSTRAINT "fk_estado_to_tbl_estado" CASCADE;
-- ALTER TABLE "Default"."factura" DROP CONSTRAINT "fk_vehiculo_to_tbl_vehiculo" CASCADE;
-- ALTER TABLE "Default"."vehiculo" DROP CONSTRAINT "fk_tipo_vehiculo_to_tbl_tipo_vehiculo" CASCADE;

-- ALTER TABLE "Default"."vehiculo" DROP CONSTRAINT "unique_placa" CASCADE;

-- DROP TABLE "Default"."estado" CASCADE;
-- DROP TABLE "Default"."factura" CASCADE;
-- DROP TABLE "Default"."tipo_vehiculo" CASCADE;
-- DROP TABLE "Default"."vehiculo" CASCADE;

CREATE TABLE "Default"."estado" (
  "id" uuid NOT NULL,
  "codigo" varchar(5),
  "nombre" varchar(255),
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "Default"."estado"."codigo" IS 'Codigo de referencia de un estado';
COMMENT ON COLUMN "Default"."estado"."nombre" IS 'Nombre del estado';
COMMENT ON TABLE "Default"."estado" IS 'Estado de la factura al momento de ingresar al parking';

CREATE TABLE "Default"."factura" (
  "id" uuid NOT NULL,
  "vehiculo" uuid,
  "entrada" timestamp,
  "salida" timestamp,
  "minutos" text,
  "estado" uuid,
  "valor_total" float8,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "Default"."factura"."vehiculo" IS 'Vehiculo que ingreso al parking';
COMMENT ON COLUMN "Default"."factura"."entrada" IS 'Fecha y hora que entro el vehiculo  del parking';
COMMENT ON COLUMN "Default"."factura"."salida" IS 'Fecha y hora que salio el vehiculo  del parking';
COMMENT ON COLUMN "Default"."factura"."minutos" IS 'Minutos que duro el vehiculo parqueado';
COMMENT ON COLUMN "Default"."factura"."estado" IS 'Estado de la factura al parquear el vehiculo';
COMMENT ON COLUMN "Default"."factura"."valor_total" IS 'Valor total del parquep';
COMMENT ON TABLE "Default"."factura" IS 'Factura generada al momento de ingresar al parking';

CREATE TABLE "Default"."tipo_vehiculo" (
  "id" uuid NOT NULL,
  "codigo" varchar(5),
  "nombre" varchar(255),
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "Default"."tipo_vehiculo"."codigo" IS 'Identificador del tipo de vehiculo';
COMMENT ON COLUMN "Default"."tipo_vehiculo"."nombre" IS 'Nombre del tipo de vehiculo';
COMMENT ON TABLE "Default"."tipo_vehiculo" IS 'Tabla que almacena los tipos de vehiculos que pueden alcanzar a clasificarse';

CREATE TABLE "Default"."vehiculo" (
  "id" uuid NOT NULL,
  "placa" varchar(15),
  "tipo_vehiculo" uuid,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  PRIMARY KEY ("id"),
  CONSTRAINT "unique_placa" UNIQUE ("placa")
);
COMMENT ON COLUMN "Default"."vehiculo"."placa" IS 'Identificador que tiene todo vehiculo';
COMMENT ON COLUMN "Default"."vehiculo"."tipo_vehiculo" IS 'Tipo de vehiculo, para identificar y clasificar cada vehiculo';
COMMENT ON CONSTRAINT "unique_placa" ON "Default"."vehiculo" IS 'Placa unica';
COMMENT ON TABLE "Default"."vehiculo" IS 'Tabla que representa un vehiculo que haya ingresado por lo menos una vez al parking';

ALTER TABLE "Default"."factura" ADD CONSTRAINT "fk_estado_to_tbl_estado" FOREIGN KEY ("estado") REFERENCES "Default"."estado" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Default"."factura" ADD CONSTRAINT "fk_vehiculo_to_tbl_vehiculo" FOREIGN KEY ("vehiculo") REFERENCES "Default"."vehiculo" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
COMMENT ON CONSTRAINT "fk_estado_to_tbl_estado" ON "Default"."factura" IS 'Foraneidad de la facuta con su estado';
COMMENT ON CONSTRAINT "fk_vehiculo_to_tbl_vehiculo" ON "Default"."factura" IS 'Foraneidad de la facturaa con su vehiculo';
ALTER TABLE "Default"."vehiculo" ADD CONSTRAINT "fk_tipo_vehiculo_to_tbl_tipo_vehiculo" FOREIGN KEY ("tipo_vehiculo") REFERENCES "Default"."tipo_vehiculo" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
COMMENT ON CONSTRAINT "fk_tipo_vehiculo_to_tbl_tipo_vehiculo" ON "Default"."vehiculo" IS 'Foreneidad del vehiculo con su tipo de vehiculo';

-- INSERTS IN TABLE tipo_vehiculo

INSERT tipo_vehiculo (codigo, nombre) VALUES
('POLI', 'Policia'),
('EJER', 'Ejercito'),
('BOMB', 'Bombero'),
('AMBU', 'Ambulancia'),
('BICI', 'Bicicleta'),
('MOTO', 'Motocicleta'),
('AUPA', 'Automovile particular'),
('VEPE', 'Vehiculo pesado');

-- INSERTS IN TABLE estado

INSERT estado (codigo, nombre) VALUES
('PARQ', 'Parqueado'),
('CANC', 'Cancelado'),
('FINA', 'Finalizado');
