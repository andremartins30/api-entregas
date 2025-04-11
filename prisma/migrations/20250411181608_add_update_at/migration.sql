/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "atualizadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_password_key" ON "Usuario"("password");
