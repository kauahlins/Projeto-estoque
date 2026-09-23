import { prisma } from "../prisma/lib/prisma.js"
import bcrypt from "bcrypt"

export async function cadastrarUsuario(req, res) {
    const { email, senha } = req.body

    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await prisma.users.create({
        data: {
            email: email,
            password_hash: senhaHash
        }
    })

    return res.status(201).json(usuario)

}

export async function LoginUsuario(req, res) {
    const { email, senha } = req.body

    const usuario = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (!usuario) {
        return res.status(401).json({
            mensagem: "email ou senha inválidos"
        })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.password_hash)

    if (!senhaCorreta) {
        return res.status(401).json({
            mensagem: "email ou senha inválidos"
        })
    }
    return res.status(200).json({
        user_id: usuario.user_id
    })
}