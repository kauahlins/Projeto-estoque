import { useState } from "react";

function Produtos() {

    const [produto, setProduto] = useState("")
    const [produtos, setProdutos] = useState([])


    function handlecadastro() {

        const novoProduto = {
            id: produtos.length + 1,
            nome: produto
        }


        setProdutos([...produtos, novoProduto])
    }

    return (
        <div className="flex flex-col gap-8">
            <header className="bg-gray-50">
                <h3 className=" justify font-serif text-4xl text-blue-500" >Gerenciamento de estoque</h3>
            </header>
            <main className="ml-15 min-w-screen flex gap-2">
                <input onChange={(event) => setProduto(event.target.value)} className="p-5 rounded" type="text" placeholder="nome do produto" />
                <button onClick={handlecadastro} type="button" className="bg-blue-700 text-white p-1 m-0.5 rounded w-30">
                    cadastrar
                </button>
            </main>
            <div className="min-w-screen bg-gray-100">
                <div className="flex items-center gap-40 py-5">
                    <p className="ml-20 text-1xl">id</p>
                    <p className="text-1xl">Produto</p>
                    <p className="text-1xl" >Categoria</p>
                    <p className="text-1xl" >Estoque</p>
                </div>
                {produtos.map((produto) => (
                    <div className="flex gap-27" >
                        <p className="w-20 ml-20 m-2">{produto.id}</p>
                        <p className="w-40">{produto.nome}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Produtos