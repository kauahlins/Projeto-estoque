
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Cadastro() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function CadastrarUsuario(e) {
        e.preventDefault()

        const resposta = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        })
        if (resposta.ok) {
            alert("usuario cadastrado com sucesso")
            navigate("/login")
        } else {
            alert("erro ao cadastrar usuario")
        }
    }

    return (
        <form className=" min-h-screen flex justify-center items-center">
            <div className="bg-blue-200 p-10 w-90 rounded-3xl flex flex-col gap-2">
                <h5 className="text-4xl font-semibold text-gray-800 mb-8 text-center ">Cadastro</h5>
                <p className="text-gray-700 font-medium text-xl mb-2">email</p>
                <input onChange={(event) => setEmail(event.target.value)} className="border border-gray-300 rounded-xl px-2 py-2 bg-white text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="email" placeholder="Digite seu email" />
                <p className="text-gray-800 font-medium text-xl mb-2">senha</p>
                <input onChange={(event) => setSenha(event.target.value)} className="border border-gray-300 rounded-xl px-2 py-2 bg-white text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" type="password" placeholder="Digite sua senha" />
                <button onClick={CadastrarUsuario} type="button" className=" bg-blue-600 w-full max-w-sm py-3 rounded-lg text-white font-semibold shadow-sm transition hover:bg-blue-700 active:scale-95 mt-6">
                    Cadastrar
                </button>
            </div>
        </form>

    );

}
export default Cadastro
