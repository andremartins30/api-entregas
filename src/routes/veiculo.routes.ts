import { Router } from 'express'
import VeiculoController from '../controllers/VeiculoController'
import { ensureAuth } from '../middlewares/ensureAuth'

const veiculoRoutes = Router()

veiculoRoutes.post('/create', ensureAuth, VeiculoController.create)
veiculoRoutes.get('/list', ensureAuth, VeiculoController.getUserVeiculos)
veiculoRoutes.get('/list-all', ensureAuth, VeiculoController.getTodosVeiculos)
veiculoRoutes.put('/:id', ensureAuth, VeiculoController.updateVeiculo)
veiculoRoutes.delete('/:id', ensureAuth, VeiculoController.deletarVeiculo)

export { veiculoRoutes }
