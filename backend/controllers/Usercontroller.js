import { prisma } from "../prisma/lib/prisma.js"

export async function cadastrarUsuario(req, res) {
    const { email, senha } = req.body

    const usuario = await prisma.users.create({
        data: {
            email: email,
            password_hash: senha
        }
    })

    return res.status(201).json(usuario)

}