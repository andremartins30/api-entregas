import { Router, Request, Response } from 'express'
import UsuarioController from '../controllers/UsuarioController'

const usuarioRoutes = Router()

usuarioRoutes.post('/register', async (req: Request, res: Response) => {
    await UsuarioController.register(req, res)
})

usuarioRoutes.post('/login', async (req: Request, res: Response) => {
    await UsuarioController.login(req, res)
})

export { usuarioRoutes }