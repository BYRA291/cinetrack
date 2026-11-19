function Estrelas({ nota }) {
  const simbolos = Array.from({ length: 5 }, (_, indice) =>
    indice < nota ? "★" : "☆",
  ).join("");

  return (
    <>
      <span className="visualmente-oculto">Nota: {nota} de 5</span>
      <span aria-hidden="true">{simbolos}</span>
    </>
  );
}

export default Estrelas;
