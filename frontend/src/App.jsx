import { useState } from "react";
import { filmesIniciais, gerarId } from "./data/filmes.js";
import Filtros from "./components/Filtros.jsx";
import Header from "./components/Header.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";
import ModalFilme from "./components/ModalFilme.jsx";

function App() {
  const [status, setStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [filmes, setFilmes] = useState(filmesIniciais);
  const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);

  function adicionar(dados) {
    setFilmes((atuais) => [...atuais, { ...dados, id: gerarId(atuais) }]);
  }

  function remover(id) {
    setFilmes((atuais) => atuais.filter((filme) => filme.id !== id));
  }

  function editar(id, alteracoes) {
    setFilmes((atuais) =>
      atuais.map((filme) =>
        filme.id === id ? { ...filme, ...alteracoes } : filme,
      ),
    );
  }

  const termoBusca = busca.trim().toLocaleLowerCase("pt-BR");
  const visiveis = filmes
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
          <div className="acoes-colecao">
            <span className="total-filmes">{filmes.length} títulos</span>
            <button className="botao-adicionar" type="button" onClick={() => setFilmeEmEdicao({})}>
              + Adicionar filme
            </button>
          </div>
        </div>
        <Filtros ativo={status} aoMudar={setStatus} />
        <ListaFilmes filmes={visiveis} aoEditar={setFilmeEmEdicao} aoRemover={remover} />
      </main>
      {filmeEmEdicao !== null && (
        <ModalFilme
          filme={filmeEmEdicao.id ? filmeEmEdicao : null}
          aoSalvar={(dados) => {
            if (filmeEmEdicao.id) editar(filmeEmEdicao.id, dados);
            else adicionar(dados);
            setFilmeEmEdicao(null);
          }}
          aoFechar={() => setFilmeEmEdicao(null)}
        />
      )}
      <footer className="rodape">
        <span>CineTrack</span>
        <small>Uma boa história merece ser lembrada.</small>
      </footer>
    </div>
  );
}

export default App;
