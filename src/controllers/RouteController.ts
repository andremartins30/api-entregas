import { Request, Response } from 'express';
import { OpenRouteService } from '../services/OpenRouteService';

export class RouteController {
    private routeService: OpenRouteService;

    constructor() {
        this.routeService = new OpenRouteService();
    }

    async calculateRoute(req: Request, res: Response) {
        try {
            const { origin, destination } = req.body;

            if (!origin?.latitude || !origin?.longitude || !destination?.latitude || !destination?.longitude) {
                return res.status(400).json({ error: 'Coordenadas de origem e destino são obrigatórias' });
            }

            const routeInfo = await this.routeService.getRoute(origin, destination);
            return res.json(routeInfo);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getLocationInfo(req: Request, res: Response) {
        try {
            const { latitude, longitude } = req.query;

            if (!latitude || !longitude) {
                return res.status(400).json({ error: 'Coordenadas são obrigatórias' });
            }

            const coordinates = {
                latitude: Number(latitude),
                longitude: Number(longitude)
            };

            const locationInfo = await this.routeService.getReverseGeocode(coordinates);
            return res.json(locationInfo);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
} 