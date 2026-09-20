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


export async function LoginUsuario(req, res) {
    const {email, senha} = req.body

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

    if (usuario.password_hash !== senha) {
        return res.status(401).json({
            mensagem: "email ou senha inválidos"
        })
    }
    return res.status(200).json({
        user_id: usuario.user_id
    })

}