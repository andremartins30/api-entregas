import { Request, Response } from 'express'
import { UsuarioService } from '../services/UsuarioService'

export const UsuarioController = {
    async register(req: Request, res: Response): Promise<void> {
        const { nome, email, password } = req.body

        try {
            const usuario = await UsuarioService.register(nome, email, password)
            res.status(201).json(usuario)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    },

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body

        try {
            const result = await UsuarioService.login(email, password)
            res.json(result)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    },

    async logout(req: Request, res: Response): Promise<void> {
        const userId = (req as any).user.id; // Pega o ID do usuário do token decodificado

        res.status(200).json({
            message: 'Logout realizado com sucesso',
            userId: userId,
            tokenExpired: true
        })
    },

    async protectedRoute(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: 'Rota protegida acessada com sucesso' })
    },

    async getCurrentUser(req: Request, res: Response): Promise<void> {
        const userId = (req as any).user.id;
        const user = await UsuarioService.getUserById(userId);

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        // Retorna apenas os dados necessários, excluindo a senha
        const { id, nome, email } = user;
        res.status(200).json({ user: { id, nome, email } });
    }
}

export default UsuarioController