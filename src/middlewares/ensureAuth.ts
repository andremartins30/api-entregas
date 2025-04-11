import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: string;
    [key: string]: any;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(401).json({ error: 'Token não fornecido' })
        return
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
        // Se quiser, você pode guardar o id do usuário aqui:
        (req as any).user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' })
    }
}

export default ensureAuth