import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
//import Produtos from "./components/produtos";
import Cadastro from "./components/cadastro";
import Sessaoestoque from "./components/sessao_estoque";

function App() {
  return (
    <BrowserRouter>
      <div className=" bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cadastro" element={<Cadastro />}></Route>
          <Route path="/estoque" element={<Sessaoestoque />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App
