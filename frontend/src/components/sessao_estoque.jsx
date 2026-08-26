import { useState } from "react";

function Sessaoestoque() {

  const [produto, setProduto] = useState("")
  const [produtos, setProdutos] = useState([])


  function novoProduto() {

    const novoProduto = {
      id: produtos.length + 1,
      nome: produto
    }


    setProdutos([...produtos, novoProduto])
  }
  return (
    <div className="min-h-screen bg-gray-100">


      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Gerenciamento de estoque
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8">


        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-xl font-semibold text-gray-700 mb-5">
            Cadastrar produto
          </h2>

          <div className="flex items-end gap-4">

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Nome do produto
              </label>

              <input
                type="text"
                value={produto}
                onChange={(event) => setProduto(event.target.value)}
                placeholder="Digite o nome do produto"
                className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-white
                text-gray-700
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
              />
            </div>

            <button
              type="button"
              onClick={novoProduto}
              className="
              px-7
              py-3
              rounded-xl
              bg-blue-600
              text-white
              font-semibold
              shadow-sm
              transition
              hover:bg-blue-700
              active:scale-95
              cursor-pointer
            "
            >
              Cadastrar
            </button>

          </div>

        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 px-6 py-4">
            <p className="font-semibold text-gray-600">
              ID
            </p>
            <p className="font-semibold text-gray-600">
              Produto
            </p>
            <p className="font-semibold text-gray-600">
              Categoria
            </p>
            <p className="font-semibold text-gray-600">
              Estoque
            </p>

          </div>

          <div className="divide-y divide-gray-100">

            {produtos.map((produto) => (

              <div
                key={produto.id}
                className="
                grid
                grid-cols-4
                px-6
                py-4
                hover:bg-blue-50
                transition
              "
              >
                <p className="text-gray-500">
                  {produto.id}
                </p>

                <p className="font-medium text-gray-700">
                  {produto.nome}
                </p>

                <p className="text-gray-500">
                  {produto.category}
                </p>

                <p className="text-gray-500">
                  {produto.available ? "Disponível" : "Indisponível"}
                </p>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}
export default Sessaoestoque