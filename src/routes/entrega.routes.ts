import { Router } from 'express'
import { EntregaController } from '../controllers/EntregaController'
import { ensureAuth } from '../middlewares/ensureAuth'

const entregaRoutes = Router()

entregaRoutes.post('/delivery', ensureAuth, EntregaController.createDelivery.bind(EntregaController))
entregaRoutes.put('/delivery/:id', ensureAuth, EntregaController.updateDelivery.bind(EntregaController))
entregaRoutes.get('/delivery', ensureAuth, EntregaController.readDelivery.bind(EntregaController))
entregaRoutes.get('/delivery/:id', ensureAuth, EntregaController.readDelivery.bind(EntregaController))

export { entregaRoutes }