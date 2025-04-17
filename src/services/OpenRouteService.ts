import axios from 'axios';
import { config } from 'dotenv';
import { obterSiglaEstadoPorNome } from '../utils/geolocalizacao';

config();

const ORS_API_KEY = process.env.OPENROUTESERVICE_API_KEY;

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface RouteInfo {
    coordinates: Coordinates[];
    distance: number;
    duration: number;
}

interface LocationInfo {
    address: string;
    coordinates: Coordinates;
}

export class OpenRouteService {
    private readonly baseUrl = 'https://api.openrouteservice.org';

    async getRoute(origin: Coordinates, destination: Coordinates): Promise<RouteInfo> {
        try {
            const response = await axios.post(
                `${this.baseUrl}/v2/directions/driving-car/geojson`,
                {
                    coordinates: [
                        [origin.longitude, origin.latitude],
                        [destination.longitude, destination.latitude]
                    ]
                },
                {
                    headers: {
                        Authorization: ORS_API_KEY,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const coordinates = response.data.features[0].geometry.coordinates.map(
                ([lng, lat]: number[]) => ({
                    latitude: lat,
                    longitude: lng
                })
            );

            const distance = response.data.features[0].properties.segments[0].distance / 1000; // km
            const duration = response.data.features[0].properties.segments[0].duration / 60; // minutes

            return {
                coordinates,
                distance,
                duration
            };
        } catch (error: any) {
            throw new Error('Erro ao calcular rota: ' + error.message);
        }
    }

    async getReverseGeocode(coordinates: Coordinates): Promise<LocationInfo> {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
                params: {
                    lat: coordinates.latitude,
                    lon: coordinates.longitude,
                    format: 'json',
                    addressdetails: 1
                },
                headers: {
                    'User-Agent': 'api-entregas-app/1.0'
                }
            });

            const address = response.data.address;


            const rua = address.road || address.street || '';
            const numero = address.house_number || '';
            const bairro = address.neighbourhood || address.suburb || address.city_district || '';
            const cidade = address.city || address.town || address.village || address.county || '';
            const estadoNome = address.state || '';
            const siglaEstado = obterSiglaEstadoPorNome(estadoNome) || estadoNome; // fallback para nome, se falhar

            const nomeLocal = [rua, numero, bairro, cidade, siglaEstado].filter(Boolean).join(', ');


            return {
                address: nomeLocal,
                coordinates
            };
        } catch (error: any) {
            throw new Error('Erro ao obter endereço via Nominatim: ' + error.message);
        }
    }
} 
