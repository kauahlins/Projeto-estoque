import { useState, useEffect } from "react";

function Sessaoestoque() {

  const user_id = sessionStorage.getItem("user_id")

  const [produto, setProduto] = useState("")
  const [categoria, setCategoria] = useState("")
  const [preco, setPreco] = useState("")
  const [available, setAvailable] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [produtoEditando, setProdutoEditando] = useState(null)

  useEffect(() => {
    async function carregarProdutos() {
      const resposta = await fetch(`http://localhost:3000/products/${user_id}`);

      const dados = await resposta.json();

      setProdutos(dados)
    }

    carregarProdutos();
  }, []);


  async function novoProduto() {

    console.log("produto", produto)
    console.log("categoria", categoria)
    console.log("preço", preco)
    console.log("available", available)


    if (!produto || !categoria || !preco) {

      alert("Preencha todos os campos !!!");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          name: produto,
          category: categoria,
          price: Number(preco),
          available: available,
          user_id: Number(user_id)
        })

      });

      alert("campos enviado");

      console.log("resposta chegou")
      console.log("status:")
      console.log("ok:", resposta.ok)


      if (!resposta.ok) {
        const erro = await resposta.text();
        console.log("erro da api", erro);

        alert("erro ao cadastrar o produto")
        return;
      }

      const produtoSalvo = await resposta.json();

      console.log("4 - produto salvo", produtoSalvo)

      const novoProduto = {
        product_id: produtoSalvo.product_id,
        name: produtoSalvo.name,
        category: produtoSalvo.category,
        price: produtoSalvo.price,
        available: produtoSalvo.available
      };


      console.log("5 novo produto", novoProduto)

      setProdutos([...produtos, novoProduto]);

      setProduto("")
      setCategoria("")
      setPreco("")
      setAvailable(true)

      alert("produto cadastrado com sucesso")

    } catch (erro) {
      console.error("erro no fetch", erro);
      alert("erro no fetch:" + erro.message)
    }
  }

  async function editarProduto(id) {
    const resposta = await fetch(`http://localhost:3000/products/${id}/${user_id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({
        name: produtoEditando.name,
        category: produtoEditando.category,
        price: produtoEditando.price,
        available: produtoEditando.available
      })
    }
    )

    if (resposta.ok) {
      const produtoAtualizado = await resposta.json()

      setProdutos(produtos => produtos.map(produto => produto.product_id === id
        ? produtoAtualizado
        : produto
      )
      )
      setProdutoEditando(null)

      alert("O produto foi editado")
    } else {
      alert("o produto não foi editado")
    }
  }

  async function deletarProduto(id) {
    const resposta = await fetch(`http://localhost:3000/products/${id}/${user_id}`, {
      method: "DELETE",
    })

    if (resposta.ok) {
      setProdutos(produtos => produtos.filter(produto => produto.product_id !== id)
      )
      alert("produto foi excluido")
    } else {
      alert("produto não foi excluido")
    }
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

          <div className="flex items-end gap-4 flex-wrap">

            <div className="flex-1 min-w-[220px\]">
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
                focus:ring-blue-100"
              />
            </div>

            <div className="w-48" >
              <label className="block text-sm font-medium text-gray-600 mb-2" >
                Categoria
              </label>

              <select value={categoria} onChange={(event) => setCategoria(event.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" >
                <option value="">Selecione</option>
                <option value="Utensilio">Utensilio</option>
                <option value="Eletrodoméstico">Eletrodoméstico</option>
                <option value="Vestuário">Vestuário</option>
                <option value="Alimentos">Alimentos</option>
              </select>
            </div>

            <div className="w-32" >
              <label className="block text-sm font-medium text-gray-600 mb-2" >
                Preço
              </label>

              <input type="number" step="0.01" value={preco} onChange={(event) => setPreco(event.target.value)} placeholder="R$ 0,00" className="
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
              " />

            </div>

            <div className="w-40" >
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Disponibilidade
              </label>

              <select value={available} onChange={(event) => setAvailable(event.target.value === "true")} className=" w-full
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
              focus:ring-blue-100"
              >
                <option value="true" > ✔️ Disponível</option>
                <option value="false" >❌ Indisponível </option>
              </select>
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
              cursor-pointer"
            >
              Cadastrar
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

          <div className="grid grid-cols-6 gap-3 bg-gray-50 border-gray-200 px-6 py-4">
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
              Preço
            </p>
            <p className="font-semibold text-gray-600">
              Disponibilidade
            </p>
          </div>

          <div className="divide-y divide-gray-100">

            {produtos.map((produto) => (

              <div
                key={produto.product_id}
                className="
                grid
                grid-cols-6
                gap-4
                px-6
                py-4
                border-t
                border-gray-200
                items-center
              "
              >
                <p className="text-gray-500">
                  {produto.product_id}
                </p>

                {produtoEditando?.product_id === produto.product_id ? (
                  <input autoFocus value={produtoEditando.name} onChange={(e) => setProdutoEditando({ ...produtoEditando, name: e.target.value })} />
                ) : (
                  <p className="font-medium text-gray-700" >
                    {produto.name}
                  </p>
                )}

                {produtoEditando?.product_id === produto.product_id ? (
                  <input value={produtoEditando.category} onChange={(e) => setProdutoEditando({ ...produtoEditando, category: e.target.value })} >
                  </input>
                ) : (
                  <p className="text-gray-500">
                    {produto.category}
                  </p>
                )}


                {produtoEditando?.product_id === produto.product_id ? (
                  <input type="number" step="0.1" value={produtoEditando.price} onChange={(e) => setProdutoEditando({ ...produtoEditando, price: e.target.value })} >
                  </input>
                ) : (
                  <p className="text-gray-500" >
                    R${Number(produto.price).toFixed(2)}
                  </p>
                )}

                {produtoEditando?.product_id === produto.product_id ? (
                  <select value={produtoEditando.available} onChange={(e) => setProdutoEditando({ ...produtoEditando, available: e.target.value === "true" })} >
                    <option value="true">Disponível</option>
                    <option value="false">Indisponível</option>
                  </select>
                ) : (

                  <p className="text-gray-500">
                    {produto.available ? "Disponível" : "Indisponível"}
                  </p>
                )}

                <div className="flex gap-2" >

                  {produtoEditando?.product_id === produto.product_id ? (
                    <button className="bg-green-400 text-white px-3 py-1 rounded-xl font-semilbold shadow-sm" onClick={() => editarProduto(produto.product_id, produto.user_id)} >
                      Salvar
                    </button>
                  ) : (
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-xl font-semilbold shadow-sm"
                      onClick={() => setProdutoEditando({ ...produto })}>
                      Editar
                    </button>
                  )}

                  <button className="bg-red-500 text-white px-3 py-1 rounded-xl font-semilbold shadow-sm" onClick={() => deletarProduto(produto.product_id, produto.user_id)} >
                    Excluir
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

    </div>
  )
}
export default Sessaoestoque