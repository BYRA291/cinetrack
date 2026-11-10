import CardFilme from "./CardFilme.jsx";

function ListaFilmes({ filmes, aoEditar, aoRemover }) {
  if (filmes.length === 0) {
    return <p className="lista-vazia">Nenhum filme encontrado.</p>;
  }

  return (
    <section id="lista" aria-labelledby="titulo-lista" aria-live="polite">
      <h2 id="titulo-lista">Filmes</h2>
      <div className="grade-filmes">
        {filmes.map((filme) => (
          <CardFilme
            key={filme.id}
            filme={filme}
            aoEditar={() => aoEditar(filme)}
            aoRemover={() => aoRemover(filme.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default ListaFilmes;
