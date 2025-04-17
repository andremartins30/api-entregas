import { Request, Response } from 'express'
import { VeiculoService } from '../services/VeiculoService'

const VeiculoController = {
    async create(req: Request, res: Response) {
        const { modelo, placa } = req.body
        const usuarioId = (req as any).user.id
        const veiculo = await VeiculoService.create(modelo, placa, Number(usuarioId))
        res.status(201).json(veiculo)
    },

    async getUserVeiculos(req: Request, res: Response) {
        const usuarioId = (req as any).user.id
        const veiculos = await VeiculoService.getUserVeiculos(Number(usuarioId))
        res.status(200).json(veiculos)
    },

    async getTodosVeiculos(req: Request, res: Response) {
        const veiculos = await VeiculoService.getTodosVeiculos()
        res.status(200).json(veiculos)
    }
}

export default VeiculoController