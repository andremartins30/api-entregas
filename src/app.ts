import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routes } from './routes/index'


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

console.log('JWT_SECRET:', process.env.JWT_SECRET)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`))