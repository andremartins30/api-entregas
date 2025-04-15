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

    async updateStatusDelivery(id: number, status: string) {
        return await prisma.entrega.update({
            where: { id },
            data: {
                status
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
    },

    async countDelivery() {
        return await prisma.entrega.count()
    },


    async countDeliveryByStatus(status: string) {
        return await prisma.entrega.count({
            where: {
                status
            }
        })
    },

    async getDeliveryCounts() {
        const [total, pendente, emTransito, entregue] = await Promise.all([
            this.countDelivery(),
            this.countDeliveryByStatus('PENDENTE'),
            this.countDeliveryByStatus('EM_TRANSITO'),
            this.countDeliveryByStatus('ENTREGUE')
        ]);

        return {
            total,
            pendente,
            emTransito,
            entregue
        }

    }
}

export default EntregaService
