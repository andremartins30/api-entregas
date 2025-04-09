import { Request, Response } from 'express'
import { UsuarioService } from '../services/UsuarioService'

export const UsuarioController = {
    async register(req: Request, res: Response) {
        const { nome, email, password } = req.body

        try {
            const usuario = await UsuarioService.register(nome, email, password)
            return res.status(201).json(usuario)
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const result = await UsuarioService.login(email, password)
            return res.json(result)
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    },
}

export default UsuarioController