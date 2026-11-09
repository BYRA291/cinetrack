function Header({ busca, aoBuscar }) {
  return (
    <header className="cabecalho">
      <div className="marca">
        <span className="marca-icone" aria-hidden="true">▶</span>
        <h1>CineTrack</h1>
      </div>
      <p>Seu próximo filme favorito está na lista.</p>
      <label className="campo-busca">
        <span className="visualmente-oculto">Buscar filmes pelo título</span>
        <input
          type="search"
          value={busca}
          onChange={(evento) => aoBuscar(evento.target.value)}
          placeholder="Buscar por título..."
        />
      </label>
    </header>
  );
}

export default Header;
