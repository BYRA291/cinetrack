import { filmesIniciais } from "./data/filmes.js";
import Filtros from "./components/Filtros.jsx";
import Header from "./components/Header.jsx";
import ListaFilmes from "./components/ListaFilmes.jsx";

function App() {
  return (
    <div className="pagina">
      <Header />
      <main className="conteudo">
        <div className="cabecalho-lista">
          <div>
            <p className="sobretitulo">SUA COLEÇÃO</p>
            <h2>Minha lista de filmes</h2>
          </div>
          <span className="total-filmes">{filmesIniciais.length} títulos</span>
        </div>
        <Filtros />
        <ListaFilmes filmes={filmesIniciais} />
      </main>
      <footer className="rodape">
        <span>CineTrack</span>
        <small>Uma boa história merece ser lembrada.</small>
      </footer>
    </div>
  );
}

export default App;
