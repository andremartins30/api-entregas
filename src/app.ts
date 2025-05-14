import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { routes } from './routes/index'
import morgan from 'morgan'
import helmet from 'helmet'
import path from 'path'

dotenv.config()

const app = express()
const httpServer = createServer(app)

// Configuração do CORS antes de todas as rotas
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://10.120.0.14:8081',  // Add Expo development server
        'https://webapp-entregas-j12y0hs98-andremartins30s-projects.vercel.app',
        'https://webapp-entregas-p29kj96ip-andremartins30s-projects.vercel.app',
        'https://webapp-entregas.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true })) // Add this to handle form data

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use(routes)
app.use(morgan('dev'))
app.use(helmet())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://webapp-entregas-8oddy00h6-andremartins30s-projects.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const PORT = process.env.PORT || 3333
httpServer.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`))
