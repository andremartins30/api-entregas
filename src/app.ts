import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { routes } from './routes/index'
import morgan from 'morgan'
import helmet from 'helmet'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const allowedOrigins = process.env.FRONTEND_URL?.split(',') || [
    'http://localhost:3000',
    'http://localhost:5173', // Vite default port
];

// Configuração do CORS antes de todas as rotas
app.use(cors({
    origin: function (origin, callback) {
        // Permitir requisições sem origin (como apps mobile ou curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

app.use(express.json())
app.use(routes)
app.use(morgan('dev'))
app.use(helmet())

const PORT = process.env.PORT || 3333
httpServer.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`))
