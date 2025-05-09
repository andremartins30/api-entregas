-- Create the Role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE "Role" AS ENUM ('GESTOR', 'ENTREGADOR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create the Usuario table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Usuario" (
    "id" SERIAL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ENTREGADOR'
);

-- Create the Veiculo table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Veiculo" (
    "id" SERIAL PRIMARY KEY,
    "placa" TEXT NOT NULL UNIQUE,
    "modelo" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create the Entrega table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Entrega" (
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