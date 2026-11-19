import Badge from "./Badge.jsx";
import Estrelas from "./Estrelas.jsx";

function CardFilme({ filme, aoEditar, aoRemover }) {
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
        <p className="avaliacao"><Estrelas nota={filme.nota} /></p>
        <Badge status={filme.status} />
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
