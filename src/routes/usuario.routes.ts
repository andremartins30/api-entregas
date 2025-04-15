import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController'
import { ensureAuth } from '../middlewares/ensureAuth'

const usuarioRoutes = Router()

usuarioRoutes.post('/register', UsuarioController.register)
usuarioRoutes.post('/login', UsuarioController.login)
usuarioRoutes.post('/logout', ensureAuth, UsuarioController.logout)
usuarioRoutes.get('/me', ensureAuth, UsuarioController.getCurrentUser)

usuarioRoutes.get('/protected-route', ensureAuth, UsuarioController.protectedRoute)

export { usuarioRoutes }