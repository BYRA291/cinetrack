function rotuloStatus(status) {
  if (status === "assistido") return "Assistido";
  if (status === "assistindo") return "Assistindo";
  if (status === "quero") return "Quero assistir";
  return status;
}

function CardFilme({ filme, aoEditar, aoRemover }) {
  const estrelas = Array.from({ length: 5 }, (_, indice) =>
    indice < filme.nota ? "★" : "☆",
  ).join("");

  return (
    <article className="card">
      <img
        className="poster"
        src={filme.poster}
        alt={`Pôster do filme ${filme.titulo}`}
        width="80"
        height="120"
        loading="lazy"
      />
      <div className="card-conteudo">
        <h3>{filme.titulo}</h3>
        <p className="informacoes">
          {filme.ano} <span aria-hidden="true">·</span> {filme.genero}
        </p>
        <p className="avaliacao">
          <span className="visualmente-oculto">Nota: {filme.nota} de 5</span>
          <span aria-hidden="true">{estrelas}</span>
        </p>
        <span className={`badge ${filme.status}`}>{rotuloStatus(filme.status)}</span>
        {filme.comentario && <p className="comentario">{filme.comentario}</p>}
        <div className="acoes-card">
          <button type="button" onClick={aoEditar}>Editar</button>
          <button type="button" className="botao-remover" onClick={aoRemover}>Remover</button>
        </div>
      </div>
    </article>
  );
}

export default CardFilme;
