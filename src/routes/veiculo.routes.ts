import { Router } from 'express'
import VeiculoController from '../controllers/VeiculoController'
import { ensureAuth } from '../middlewares/ensureAuth'

const veiculoRoutes = Router()

veiculoRoutes.post('/create', ensureAuth, VeiculoController.create)
veiculoRoutes.get('/list', ensureAuth, VeiculoController.getUserVeiculos)
veiculoRoutes.get('/list-all', ensureAuth, VeiculoController.getTodosVeiculos)

export { veiculoRoutes }