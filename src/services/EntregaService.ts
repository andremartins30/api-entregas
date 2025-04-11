import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export const EntregaService = {
    async createDelivery(destino: string, usuarioId: number) {
        return await prisma.entrega.create({
            data: {
                destino,
                status: 'PENDENTE',
                usuarioId
            }
        })
    },

    async updateDelivery(id: number, destino?: string, status?: string) {
        return await prisma.entrega.update({
            where: { id },
            data: {
                ...(destino && { destino }),
                ...(status && { status })
            }
        })
    },

    async readDelivery(id?: number) {
        if (id) {
            return await prisma.entrega.findUnique({
                where: { id },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                        }
                    }
                }
            })
        }
        return await prisma.entrega.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                    }
                }
            }
        })
    }
}

export default EntregaService
