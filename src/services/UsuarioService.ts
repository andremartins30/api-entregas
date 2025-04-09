import { UsuarioRepository } from '../repositories/UsuarioRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const UsuarioService = {
    async register(nome: string, email: string, password: string) {
        const existe = await UsuarioRepository.findByEmail(email)
        if (existe) throw new Error('E-mail já cadastrado')

        const passwordHash = await bcrypt.hash(password, 8)
        return UsuarioRepository.create(nome, email, passwordHash)
    },

    async login(email: string, password: string) {
        const user = await UsuarioRepository.findByEmail(email)
        if (!user) throw new Error('Usuário não encontrado')

        const passwordValida = await bcrypt.compare(password, user.password)
        if (!passwordValida) throw new Error('password inválida')

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '7d',
        })

        return { token, user: { id: user.id, nome: user.nome, email: user.email } }
    },
}