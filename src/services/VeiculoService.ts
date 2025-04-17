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
                usuarioId
            }
        })
    },

    async getTodosVeiculos() {
        return await prisma.veiculo.findMany()
    }
}

export default VeiculoService

