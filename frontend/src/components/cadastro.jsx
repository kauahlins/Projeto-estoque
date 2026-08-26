import { use } from "react";
import { useState } from "react";

function Cadastro() {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    function handlecadastro() {

        alert(
            `email: ${email}\n senha: ${senha}`
        );
    }

    return (
        <form className=" min-h-screen flex justify-center items-center">
            <div className="bg-blue-200 p-10 w-90 rounded-3xl flex flex-col gap-2">
                <h5 className="text-4xl font-semibold text-gray-800 mb-8 text-center ">Cadastro</h5>
                <p className="text-gray-700 font-medium text-sm mb-2">email</p>
                <input onChange={(event) => setEmail(event.target.value)} className="border border-e-black rounded-md" type="email" placeholder="Digite seu email" />
                <p className="text-gray-700 font-medium text-sm mb-2">senha</p>
                <input onChange={(event) => setSenha(event.target.value)} className="border border-e-black rounded-md" type="password" placeholder="Digite sua senha" />
                <button onClick={handlecadastro} type="button" className=" bg-blue-600 w-full max-w-sm py-3 rounded-lg text-white font-semibold shadow-sm transition hover:bg-blue-700 active:scale-95 mt-6">
                    Cadastrar
                </button>
            </div>
        </form>

    );

}
export default Cadastro
