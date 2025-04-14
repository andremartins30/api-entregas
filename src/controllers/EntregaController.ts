import { Request, Response } from 'express'
import { EntregaService } from '../services/EntregaService'

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
            const id = req.params.id
            const { status } = req.body

            const statusEntrega = await EntregaService.updateStatusDelivery(Number(id), status)
            console.log(statusEntrega)
            res.status(200).json(statusEntrega)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar entrega' })
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
    }
}

export { EntregaController }
