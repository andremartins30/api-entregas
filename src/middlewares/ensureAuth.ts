import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: string;
    [key: string]: any;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' })

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        // Se quiser, você pode guardar o id do usuário aqui:
        (req as any).user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}