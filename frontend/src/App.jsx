import Titulo from "./components/Titulo.jsx";

const anoAtual = new Date().getFullYear();

function App() {
  return (
    <main className="pagina">
      <Titulo />

      <section className="apresentacao" aria-labelledby="boas-vindas">
        <p className="chamada">SEU CINEMA EM UM SÓ LUGAR</p>
        <h2 id="boas-vindas">Bem-vindo ao CineTrack</h2>
        <p>
          Um espaço para organizar os filmes que você já assistiu e os que
          ainda quer descobrir.
        </p>
      </section>

      <footer className="rodape">
        &copy; {anoAtual} CineTrack
      </footer>
    </main>
  );
}

export default App;
