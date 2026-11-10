import { useState } from "react";

const filmeVazio = {
  titulo: "",
  ano: "",
  genero: "",
  poster: "",
  nota: "",
  status: "quero",
  comentario: "",
};

function ModalFilme({ filme, aoSalvar, aoFechar }) {
  const [dados, setDados] = useState(() => ({ ...filmeVazio, ...filme }));

  function atualizar(evento) {
    const { name, value } = evento.target;
    setDados((atuais) => ({ ...atuais, [name]: value }));
  }

  function enviar(evento) {
    evento.preventDefault();
    aoSalvar({ ...dados, ano: Number(dados.ano), nota: Number(dados.nota) });
  }

  return (
    <div className="modal-fundo" onMouseDown={(evento) => evento.target === evento.currentTarget && aoFechar()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal">
        <div className="modal-cabecalho">
          <h2 id="titulo-modal">{filme ? "Editar filme" : "Adicionar filme"}</h2>
          <button type="button" className="fechar-modal" onClick={aoFechar} aria-label="Fechar">×</button>
        </div>
        <form onSubmit={enviar}>
          <label>Título<input name="titulo" value={dados.titulo} onChange={atualizar} required /></label>
          <div className="campos-duplos">
            <label>Ano<input name="ano" type="number" min="1888" max="2100" value={dados.ano} onChange={atualizar} required /></label>
            <label>Nota (1 a 5)<input name="nota" type="number" min="1" max="5" value={dados.nota} onChange={atualizar} required /></label>
          </div>
          <label>Gênero<input name="genero" value={dados.genero} onChange={atualizar} required /></label>
          <label>URL do pôster<input name="poster" type="url" value={dados.poster} onChange={atualizar} placeholder="https://..." /></label>
          <label>Status
            <select name="status" value={dados.status} onChange={atualizar}>
              <option value="assistido">Assistido</option>
              <option value="assistindo">Assistindo</option>
              <option value="quero">Quero assistir</option>
            </select>
          </label>
          <label>Comentário<textarea name="comentario" rows="3" value={dados.comentario} onChange={atualizar} /></label>
          <div className="botoes-modal">
            <button type="button" className="botao-cancelar" onClick={aoFechar}>Cancelar</button>
            <button type="submit" className="botao-adicionar">Salvar filme</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ModalFilme;
