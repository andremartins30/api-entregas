-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "entregadorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_entregadorId_fkey" FOREIGN KEY ("entregadorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
