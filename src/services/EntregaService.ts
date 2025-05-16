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
                    },
                    entregador: {
                        select: {
                            id: true,
                            nome: true,
                        }
                    },
                    comprovantes: {
                        select: {
                            id: true,
                            caminho: true,
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
                },
                entregador: {
                    select: {
                        id: true,
                        nome: true,
                    }
                },
                comprovantes: {
                    select: {
                        id: true,
                        caminho: true,
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

    },


    async setEntregador(entregaId: number, entregadorId: number) {
        // First check if the entrega exists
        const entrega = await prisma.entrega.findUnique({
            where: { id: entregaId }
        })

        if (!entrega) {
            throw new Error('Entrega não encontrada')
        }

        // Then check if the entregador exists and is actually an ENTREGADOR
        const entregador = await prisma.usuario.findFirst({
            where: {
                id: entregadorId,
                role: 'ENTREGADOR'
            }
        })

        if (!entregador) {
            throw new Error('Entregador não encontrado ou usuário não é um entregador')
        }

        // If both exist, proceed with the update
        return await prisma.entrega.update({
            where: { id: entregaId },
            data: {
                entregadorId,
                status: 'EM_TRANSITO' // Optionally update status when assigning
            },
            include: {
                entregador: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            }
        })
    },

    async readEntregasDoEntregador(entregadorId: number) {
        return await prisma.entrega.findMany({
            where: {
                entregadorId: entregadorId // Filtra apenas entregas onde entregadorId é igual ao ID do usuário logado
            },
            select: {
                id: true,
                destino: true,
                status: true,
                criadaEm: true,
                atualizadaEm: true,
                usuario: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
            },
            orderBy: {
                criadaEm: 'desc'
            }
        })
    },

    async iniciarEntrega(entregaId: number, entregadorId: number, veiculoId: number) {
        return await prisma.entrega.update({
            where: {
                id: entregaId
            },
            data: {
                entregadorId,
                veiculoId,
                status: 'EM_ANDAMENTO'
            }
        })
    },

    async listarEntregasComVeiculo(entregadorId: number) {
        return await prisma.entrega.findMany({
            where: {
                entregadorId
            },
            include: {
                veiculo: true
            }
        })
    },

    async getUserEntregas(usuarioId: number) {
        return await prisma.entrega.findMany({
            where: {
                entregadorId: usuarioId
            },
            include: {
                veiculo: true // Inclui as informações do veículo
            }
        });
    },

    async countEntregasPorEntregador(entregadorId: number) {
        return await prisma.entrega.count({
            where: {
                entregadorId
            }
        })
    },

    async saveComprovantes(filePaths: string[], entregaId: number): Promise<void> {
        try {
            // Convert entregaId to number if it's a string
            const entregaIdNumber = Number(entregaId);

            // Check if entregaId is valid
            if (isNaN(entregaIdNumber)) {
                throw new Error('ID de entrega inválido');
            }

            // Verify the entrega exists
            const entrega = await prisma.entrega.findUnique({
                where: { id: entregaIdNumber }
            });

            if (!entrega) {
                throw new Error('Entrega não encontrada');
            }

            for (const filePath of filePaths) {
                await prisma.comprovante.create({
                    data: {
                        caminho: filePath,
                        entregaId: entregaIdNumber,
                    },
                });
            }
        } catch (error) {
            console.error('Erro ao salvar comprovantes no banco de dados:', error);
            throw new Error('Erro ao salvar comprovantes no banco de dados.');
        }
    }
}

export default EntregaService
