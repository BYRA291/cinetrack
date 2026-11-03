const opcoesStatus = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "assistido", rotulo: "Assistidos" },
  { valor: "assistindo", rotulo: "Assistindo" },
  { valor: "quero", rotulo: "Quero assistir" },
];

function Filtros() {
  return (
    <nav className="filtros" aria-label="Filtros de status">
      {opcoesStatus.map(({ valor, rotulo }, indice) => (
        <button
          key={valor}
          type="button"
          className={indice === 0 ? "filtro ativo" : "filtro"}
          aria-pressed={indice === 0}
        >
          {rotulo}
        </button>
      ))}
    </nav>
  );
}

export default Filtros;
