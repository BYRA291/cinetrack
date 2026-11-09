import { useState } from "react";
import { filmesIniciais } from "./data/filmes.js";
import Filtros from "./components/Filtros.jsx";
import Header from "./components/Header.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");

  const termoBusca = busca.trim().toLocaleLowerCase("pt-BR");
  const visiveis = filmesIniciais
    .filter((filme) => status === "todos" || filme.status === status)
    .filter((filme) =>
      filme.titulo.toLocaleLowerCase("pt-BR").includes(termoBusca),
    );

  return (
    <div className="pagina">
      <Header busca={busca} aoBuscar={setBusca} />
      <main className="conteudo">
        <div className="cabecalho-lista">
          <div>
            <p className="sobretitulo">SUA COLEÇÃO</p>
            <h2>Minha lista de filmes</h2>
          </div>
          <span className="total-filmes">{filmesIniciais.length} títulos</span>
        </div>
        <Filtros ativo={status} aoMudar={setStatus} />
        <ListaFilmes filmes={visiveis} />
      </main>
      <footer className="rodape">
        <span>CineTrack</span>
        <small>Uma boa história merece ser lembrada.</small>
      </footer>
    </div>
  );
}

export default App;
