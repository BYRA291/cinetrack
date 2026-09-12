function rotuloStatus(status) {
  if (status === "assistido") return "Assistido";
  if (status === "assistindo") return "Assistindo";
  if (status === "quero") return "Quero assistir";
  return status;
}

const estrelas = (nota) => {
  let texto = "";
  for (let i = 1; i <= 5; i++) {
    texto += i <= nota ? "★" : "☆";
  }
  return texto;
};

console.log(rotuloStatus("quero"), estrelas(3));

const primeiroCard = document.querySelector(".card");

if (primeiroCard) {
  const badge = primeiroCard.querySelector(".badge");
  if (badge) {
    badge.textContent = rotuloStatus("assistido");
  }

  const nota = primeiroCard.querySelector("span[role='img']");
  if (nota) {
    const valor = 4;
    nota.textContent = estrelas(valor);
    nota.setAttribute("aria-label", `Nota: ${valor} de 5`);
  }
}

const cards = document.querySelectorAll(".card");
const TOTAL = 6;

for (const card of cards) {
  const badge = card.querySelector(".badge");
  const nota = card.querySelector("span[role='img']");

  if (badge) {
    badge.textContent = rotuloStatus(badge.classList.contains("assistido") ? "assistido" : badge.classList.contains("assistindo") ? "assistindo" : "quero");
  }

  if (nota) {
    const valor = Number(nota.getAttribute("aria-label").match(/\d+/)?.[0] || 5);
    nota.textContent = estrelas(valor);
  }
}

const rodape = document.querySelector("small");
if (rodape) {
  rodape.textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados.`;
}
