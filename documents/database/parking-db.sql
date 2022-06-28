CREATE TABLE "estado" (
  "id" serial2,
  "codigo" varchar(5),
  "nombre" varchar(255),
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "estado"."codigo" IS 'Codigo de referencia de un estado';
COMMENT ON COLUMN "estado"."nombre" IS 'Nombre del estado';
COMMENT ON TABLE "estado" IS 'Estado de la factura al momento de ingresar al parking';

CREATE TABLE "factura" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "vehiculo" varchar(15),
  "entrada" timestamp,
  "salida" timestamp,
  "minutos" text,
  "estado" varchar(5),
  "valor_total" float8,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "factura"."vehiculo" IS 'Vehiculo que ingreso al parking';
COMMENT ON COLUMN "factura"."entrada" IS 'Fecha y hora que entro el vehiculo  del parking';
COMMENT ON COLUMN "factura"."salida" IS 'Fecha y hora que salio el vehiculo  del parking';
COMMENT ON COLUMN "factura"."minutos" IS 'Minutos que duro el vehiculo parqueado';
COMMENT ON COLUMN "factura"."estado" IS 'Estado de la factura al parquear el vehiculo';
COMMENT ON COLUMN "factura"."valor_total" IS 'Valor total del parquep';
COMMENT ON TABLE "factura" IS 'Factura generada al momento de ingresar al parking';

CREATE TABLE "tipo_vehiculo" (
  "id" serial8,
  "codigo" varchar(5),
  "nombre" varchar(255),
  PRIMARY KEY ("id")
);
COMMENT ON COLUMN "tipo_vehiculo"."codigo" IS 'Identificador del tipo de vehiculo';
COMMENT ON COLUMN "tipo_vehiculo"."nombre" IS 'Nombre del tipo de vehiculo';
COMMENT ON TABLE "tipo_vehiculo" IS 'Tabla que almacena los tipos de vehiculos que pueden alcanzar a clasificarse';

CREATE TABLE "vehiculo" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "placa" varchar(15),
  "tipo_vehiculo" varchar(5),
  "createdAt" timestamp,
  "updatedAt" timestamp,
  PRIMARY KEY ("id"),
  CONSTRAINT "unique_placa" UNIQUE ("placa")
);
COMMENT ON COLUMN "vehiculo"."placa" IS 'Identificador que tiene todo vehiculo';
COMMENT ON COLUMN "vehiculo"."tipo_vehiculo" IS 'Tipo de vehiculo, para identificar y clasificar cada vehiculo';
COMMENT ON CONSTRAINT "unique_placa" ON "vehiculo" IS 'Placa unica';
COMMENT ON TABLE "vehiculo" IS 'Tabla que representa un vehiculo que haya ingresado por lo menos una vez al parking';


-- INSERTS IN TABLE tipo_vehiculo

INSERT INTO public.tipo_vehiculo (codigo, nombre) VALUES
('POLI', 'Policia'),
('EJER', 'Ejercito'),
('BOMB', 'Bombero'),
('AMBU', 'Ambulancia'),
('BICI', 'Bicicleta'),
('MOTO', 'Motocicleta'),
('AUPA', 'Automovile particular'),
('VEPE', 'Vehiculo pesado');

-- INSERTS IN TABLE estado

INSERT INTO public.estado (codigo, nombre) VALUES
('PARQ', 'Parqueado'),
('CANC', 'Cancelado'),
('FINA', 'Finalizado');
