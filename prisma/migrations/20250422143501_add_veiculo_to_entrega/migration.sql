-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "veiculoId" INTEGER;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
