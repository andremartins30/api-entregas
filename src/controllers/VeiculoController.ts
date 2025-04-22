import { Request, Response } from 'express'
import { VeiculoService } from '../services/VeiculoService'

const VeiculoController = {
    async create(req: Request, res: Response) {
        const { modelo, placa } = req.body
        const usuarioId = (req as any).user.id

        try {
            const veiculo = await VeiculoService.create(modelo, placa, Number(usuarioId))
            res.status(201).json(veiculo)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar veículo', error })
        }
    },

    async getUserVeiculos(req: Request, res: Response) {
        const usuarioId = (req as any).user.id

        try {
            const veiculos = await VeiculoService.getUserVeiculos(Number(usuarioId))
            res.status(200).json(veiculos)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar veículos do usuário', error })
        }
    },

    async getTodosVeiculos(req: Request, res: Response) {
        try {
            const veiculos = await VeiculoService.getTodosVeiculos()
            res.status(200).json(veiculos)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar todos os veículos', error })
        }
    },

    async getVeiculo(req: Request, res: Response) {
        const { id } = req.params

        try {
            const veiculo = await VeiculoService.getVeiculo(Number(id))
            if (!veiculo || veiculo.isDeleted) {
                return res.status(404).json({ message: 'Veículo não encontrado' })
            }
            res.status(200).json(veiculo)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar veículo', error })
        }
    },

    async updateVeiculo(req: Request, res: Response) {
        const { id } = req.params
        const { modelo, placa } = req.body

        try {
            const veiculo = await VeiculoService.updateVeiculo(Number(id), modelo, placa)
            res.status(200).json(veiculo)
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar veículo', error })
        }
    },

    async deletarVeiculo(req: Request, res: Response) {
        const { id } = req.params

        try {
            const veiculo = await VeiculoService.deletarVeiculo(Number(id))
            res.status(200).json({ message: 'Veículo marcado como deletado', veiculo })
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar veículo', error })
        }
    }
}

export default VeiculoController
