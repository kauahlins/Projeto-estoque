
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function fazerLogin(e) {
        e.preventDefault()

        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        })

        const dados = await resposta.json()

        if (resposta.ok) {
            sessionStorage.setItem("user_id",
                dados.user_id
            )

            alert("voce esta logado")
            navigate("/estoque")
        } else {
            alert(dados.mensagem)
        }
    }

    return (
        <form onSubmit={fazerLogin} className=" min-h-screen flex justify-center items-center">
            <div className="bg-blue-100 p-10 w-90 rounded-3xl flex flex-col gap-2">
                <h5 className="text-4xl font-semibold text-gray-800 mb-8 text-center">login</h5>
                <p className="text-gray-700 font-medium text-1xl mb-2">email</p>
                <input onChange={(event) => setEmail(event.target.value)} className="border border-gray-300 rounded-xl px-2 py-2 bg-white  text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="email" placeholder="Digite seu email" />
                <p className="text-gray-700 font-medium text-1xl mb-2">senha</p>
                <input onChange={(event) => setSenha(event.target.value)} className="border border-gray-300 rounded-xl x-2 py-2 bg-white  text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="password" placeholder="Digite sua senha" />
                <button type="submit" className=" bg-blue-600 w-full max-w-sm py-3 rounded-lg text-white font-semibold shadow-sm transition hover:bg-blue-700 active:scale-95 mt-6">
                    Entrar
                </button>
            </div>
        </form>
    );
}
export default Login