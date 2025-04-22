import { Router } from 'express'
import { EntregaController } from '../controllers/EntregaController'
import { ensureAuth } from '../middlewares/ensureAuth'

const entregaRoutes = Router()

entregaRoutes.get('/delivery/count', ensureAuth, EntregaController.countDelivery.bind(EntregaController))
entregaRoutes.put('/delivery/status/:id', ensureAuth, EntregaController.updateStatusDelivery.bind(EntregaController))
entregaRoutes.post('/delivery', ensureAuth, EntregaController.createDelivery.bind(EntregaController))
entregaRoutes.put('/delivery/atribuir', ensureAuth, EntregaController.atribuirEntregador.bind(EntregaController))
entregaRoutes.put('/delivery/:id', ensureAuth, EntregaController.updateDelivery.bind(EntregaController))
entregaRoutes.get('/delivery', ensureAuth, EntregaController.readDelivery.bind(EntregaController))
entregaRoutes.get('/delivery/me', ensureAuth, EntregaController.entregasDoEntregador.bind(EntregaController))
entregaRoutes.get('/delivery/:id', ensureAuth, EntregaController.readDelivery.bind(EntregaController))
entregaRoutes.get('/delivery/me/count', ensureAuth, EntregaController.countEntregasDoEntregador.bind(EntregaController))




export { entregaRoutes }
