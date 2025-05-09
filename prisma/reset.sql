-- Drop all tables and types
DROP TABLE IF EXISTS "Entrega" CASCADE;
DROP TABLE IF EXISTS "Veiculo" CASCADE;
DROP TABLE IF EXISTS "Usuario" CASCADE;
DROP TYPE IF EXISTS "Role" CASCADE;

-- Drop the _prisma_migrations table
DROP TABLE IF EXISTS "_prisma_migrations" CASCADE;

-- Create the Role enum
CREATE TYPE "Role" AS ENUM ('GESTOR', 'ENTREGADOR');

-- Create the Usuario table
CREATE TABLE "Usuario" (
    "id" SERIAL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ENTREGADOR'
);

-- Create the Veiculo table
CREATE TABLE "Veiculo" (
    "id" SERIAL PRIMARY KEY,
    "placa" TEXT NOT NULL UNIQUE,
    "modelo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create the Entrega table
CREATE TABLE "Entrega" (
    "id" SERIAL PRIMARY KEY,
    "destino" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "entregadorId" INTEGER,
    "veiculoId" INTEGER,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("entregadorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE SET NULL ON UPDATE CASCADE
); 