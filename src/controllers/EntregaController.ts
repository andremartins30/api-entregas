import { Request, Response } from 'express'
import { EntregaService } from '../services/EntregaService'
import path from 'path'

const EntregaController = {
    async createDelivery(req: Request, res: Response): Promise<void> {
        try {
            const { destino } = req.body
            const usuarioId = req.user?.id

            if (!destino || !usuarioId) {
                res.status(400).json({ error: 'Destino é obrigatório e usuário deve estar autenticado' })
                return
            }

            const entrega = await EntregaService.createDelivery(destino, usuarioId)
            res.status(201).json(entrega)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar entrega' })
        }
    },

    async updateDelivery(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { destino, status } = req.body

            if (!destino && !status) {
                res.status(400).json({ error: 'Pelo menos um campo (destino ou status) deve ser fornecido' })
                return
            }

            const entrega = await EntregaService.updateDelivery(Number(id), destino, status)
            res.status(200).json(entrega)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar entrega' })
        }
    },

    async updateStatusDelivery(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const { status } = req.body
            const delivery = await EntregaService.updateStatusDelivery(parseInt(id), status)
            res.json(delivery)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    },

    async readDelivery(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const entregas = await EntregaService.readDelivery(id ? Number(id) : undefined)
            res.status(200).json(entregas)
            if (!entregas) {
                res.status(404).json({ error: 'Entrega não encontrada' });
            }

        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar entregas' })
        }
    },

    async countDelivery(req: Request, res: Response): Promise<void> {
        try {
            const counts = await EntregaService.getDeliveryCounts()
            res.status(200).json(counts)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao contar entregas' })
        }
    },


    async atribuirEntregador(req: Request, res: Response): Promise<void> {
        try {
            const { entregaId, entregadorId } = req.body

            if (!entregaId || !entregadorId) {
                res.status(400).json({ error: 'Entrega e Entregador são obrigatórios' })
                return
            }

            const entregaIdNumber = Number(entregaId)
            const entregadorIdNumber = Number(entregadorId)

            if (isNaN(entregaIdNumber) || isNaN(entregadorIdNumber)) {
                res.status(400).json({ error: 'IDs inválidos' })
                return
            }

            const entrega = await EntregaService.setEntregador(entregaIdNumber, entregadorIdNumber)
            res.status(200).json(entrega)

        } catch (error: any) {
            console.error('Erro ao atribuir entregador:', error) // Add this for debugging
            res.status(500).json({
                error: 'Erro ao atribuir entregador',
                details: error.message // Add the actual error message
            })
        }
    },

    async entregasDoEntregador(req: Request, res: Response): Promise<void> {
        try {
            const entregadorId = req.user?.id

            if (!entregadorId) {
                res.status(401).json({ error: 'Usuário não autenticado' })
                return
            }

            const entregas = await EntregaService.readEntregasDoEntregador(entregadorId)
            res.status(200).json(entregas)
        } catch (error: any) {
            console.error('Erro ao buscar entregas:', error)
            res.status(500).json({
                error: 'Erro ao buscar entregas do entregador',
                details: error.message
            })
        }
    },


    async countEntregasDoEntregador(req: Request, res: Response): Promise<void> {
        const entregadorId = req.user?.id;
        if (!entregadorId) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }
        try {
            const count = await EntregaService.countEntregasPorEntregador(entregadorId);
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao contar entregas do entregador' });
        }
    },

    async uploadComprovantes(req: Request, res: Response): Promise<void> {
        try {
            console.log('Recebendo upload de comprovantes:', {
                body: req.body,
                files: req.files ? (req.files as Express.Multer.File[]).length : 0
            });

            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
                return;
            }

            if (!req.body.entregaId) {
                res.status(400).json({ error: 'ID da entrega não fornecido.' });
                return;
            }

            const filePaths = files.map(file => `uploads/comprovantes/${file.filename}`);
            const entregaId = Number(req.body.entregaId);

            console.log('Processando arquivos:', {
                filePaths,
                entregaId,
                filesCount: files.length
            });

            await EntregaService.saveComprovantes(filePaths, entregaId);

            res.status(200).json({
                message: 'Comprovantes enviados com sucesso.',
                files: filePaths.length
            });
        } catch (error) {
            console.error('Erro ao fazer upload dos comprovantes:', error);
            res.status(500).json({
                error: 'Erro ao fazer upload dos comprovantes.',
                message: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    },
}

export { EntregaController }
