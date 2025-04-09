import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const UsuarioRepository = {
    findByEmail: (email: string) =>
        prisma.usuario.findUnique({ where: { email } }),

    create: (nome: string, email: string, password: string) =>
        prisma.usuario.create({
            data: { nome, email, password },
        }),

    findById: (id: number) =>
        prisma.usuario.findUnique({ where: { id } }),
}