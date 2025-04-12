import { Router, Request, Response } from 'express';
import { RouteController } from '../controllers/RouteController';

const routeRouter = Router();
const routeController = new RouteController();

routeRouter.post('/calculate', async (req: Request, res: Response) => {
    await routeController.calculateRoute(req, res);
});

routeRouter.get('/location', async (req: Request, res: Response) => {
    await routeController.getLocationInfo(req, res);
});

export { routeRouter }; 