import { UsuarioRepository } from '../repositories/UsuarioRepository'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const UsuarioService = {
    async register(nome: string, email: string, password: string, role: string) {
        const existe = await UsuarioRepository.findByEmail(email)
        if (existe) throw new Error('E-mail já cadastrado')

        const hashedPassword = await bcrypt.hash(password, 8)

        return UsuarioRepository.create(nome, email, hashedPassword, role)
    },

    async login(email: string, password: string) {
        const user = await UsuarioRepository.findByEmail(email)
        if (!user) throw new Error('Usuário não encontrado')

        const passwordValida = await bcrypt.compare(password, user.password)
        if (!passwordValida) {
            throw new Error('Senha inválida')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        })

        return { token, user: { id: user.id, nome: user.nome, email: user.email } }
    },

    async getUserById(id: string) {
        return UsuarioRepository.findById(parseInt(id))
    }

}

export default UsuarioService
