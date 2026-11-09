const opcoesStatus = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "assistido", rotulo: "Assistidos" },
  { valor: "assistindo", rotulo: "Assistindo" },
  { valor: "quero", rotulo: "Quero assistir" },
];

function Filtros({ ativo, aoMudar }) {
  return (
    <nav className="filtros" aria-label="Filtros de status">
      {opcoesStatus.map(({ valor, rotulo }) => (
        <button
          key={valor}
          type="button"
          className={ativo === valor ? "filtro ativo" : "filtro"}
          aria-pressed={ativo === valor}
          onClick={() => aoMudar(valor)}
        >
          {rotulo}
        </button>
      ))}
    </nav>
  );
}

export default Filtros;
