import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export const VeiculoService = {
    async create(modelo: string, placa: string, usuarioId: number) {
        return await prisma.veiculo.create({
            data: {
                modelo,
                placa,
                usuarioId
            }
        })
    },
    async getUserVeiculos(usuarioId: number) {
        return await prisma.veiculo.findMany({
            where: {
                usuarioId,
                isDeleted: false
            }
        })
    },

    async getTodosVeiculos() {
        return await prisma.veiculo.findMany()
    },

    async getVeiculo(id: number) {
        return await prisma.veiculo.findUnique({
            where: { id }
        });
    },

    async deletarVeiculo(id: number) {
        return await prisma.veiculo.update({
            where: { id },
            data: { isDeleted: true }
        });
    },

    async updateVeiculo(id: number, modelo: string, placa: string) {
        return await prisma.veiculo.update({
            where: { id },
            data: { modelo, placa }
        });
    },
}

export default VeiculoService

