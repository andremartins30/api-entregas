import axios from 'axios'
import dotenv from 'dotenv'

const getRoute = async () => {
    const response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
            coordinates: [
                [-43.1729, -22.9068], // Origem: Rio de Janeiro (longitude, latitude)
                [-43.2096, -22.9035]  // Destino: Copacabana
            ]
        },
        {
            headers: {
                Authorization: process.env.OPENROUTESERVICE_API_KEY,
                'Content-Type': 'application/json'
            }
        }
    )

    return response.data
}

getRoute().then(data => console.log(JSON.stringify(data)))