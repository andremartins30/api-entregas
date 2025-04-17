import { Router } from 'express'
import { usuarioRoutes } from './usuario.routes'
import { entregaRoutes } from './entrega.routes'
import { veiculoRoutes } from './veiculo.routes'
import { routeRouter } from './route.routes'

export const routes = Router()

routes.use('/usuarios', usuarioRoutes)
routes.use('/entregas', entregaRoutes)
routes.use('/routes', routeRouter)
routes.use('/veiculos', veiculoRoutes)