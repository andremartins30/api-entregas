-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GESTOR', 'ENTREGADOR');

-- DropIndex
DROP INDEX "Usuario_password_key";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ENTREGADOR';
