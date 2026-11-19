function Badge({ status }) {
  let rotulo = status;
  if (status === "assistido") rotulo = "Assistido";
  if (status === "assistindo") rotulo = "Assistindo";
  if (status === "quero") rotulo = "Quero assistir";

  return <span className={`badge ${status}`}>{rotulo}</span>;
}

export default Badge;
