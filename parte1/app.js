const filmesIniciais = [
  {
    id: 1,
    titulo: "A Origem",
    ano: 2010,
    genero: "Ficção científica",
    poster: "https://image.tmdb.org/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    nota: 4,
    status: "assistido",
    comentario: "Um suspense de ficção científica sobre sonhos dentro de sonhos."
  },
  {
    id: 2,
    titulo: "Parasita",
    ano: 2019,
    genero: "Suspense",
    poster: "https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    nota: 5,
    status: "assistido",
    comentario: "Uma crítica social marcada por reviravoltas."
  },
  {
    id: 3,
    titulo: "O Auto da Compadecida",
    ano: 2000,
    genero: "Comédia",
    poster: "https://image.tmdb.org/t/p/w500/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
    nota: 5,
    status: "assistido",
    comentario: "Comédia brasileira inspirada na obra de Ariano Suassuna."
  },
  {
    id: 4,
    titulo: "Duna: Parte Dois",
    ano: 2024,
    genero: "Ficção científica",
    poster: "https://image.tmdb.org/t/p/w200/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    nota: 5,
    status: "assistindo",
    comentario: "Continuação da jornada de Paul Atreides em Arrakis."
  },
  {
    id: 5,
    titulo: "Interestelar",
    ano: 2014,
    genero: "Ficção científica",
    poster: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    nota: 5,
    status: "quero",
    comentario: "Uma viagem espacial em busca de um novo lar para a humanidade."
  },
  {
    id: 6,
    titulo: "Cidade de Deus",
    ano: 2002,
    genero: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
    nota: 4,
    status: "quero",
    comentario: "Drama brasileiro sobre a vida na Cidade de Deus."
  }
];

let filmes = [...filmesIniciais];
let filtroAtivo = "todos";

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

function renderizarCards(lista) {
  const secaoLista = document.querySelector("#lista");

  if (!secaoLista) return;

  const cards = lista.map((filme) => `
    <article class="card" data-id="${filme.id}">
      <img src="${filme.poster}" alt="Pôster do filme ${filme.titulo}" width="80" height="120">
      <h2>${filme.titulo}</h2>
      <p>${filme.ano} · ${filme.genero}</p>
      <p>Nota: <span role="img" aria-label="Nota: ${filme.nota} de 5">${estrelas(filme.nota)}</span></p>
      <span class="badge ${filme.status}">${rotuloStatus(filme.status)}</span>
      <div class="acoes">
        <button type="button" class="btn-editar">Editar</button>
        <button type="button" class="btn-remover">Remover</button>
      </div>
    </article>
  `).join("");

  secaoLista.innerHTML = `<h2>Filmes</h2>${cards}`;
}

function filtrarPorStatus(status) {
  if (status === "todos") return filmes;
  return filmes.filter((filme) => filme.status === status);
}

function atualizarTotal() {
  const rodape = document.querySelector("#total-filmes");

  if (rodape) {
    rodape.textContent = `CineTrack © 2026 · ${filmes.length} filmes cadastrados.`;
  }
}

renderizarCards(filmes);
atualizarTotal();

const secaoLista = document.querySelector("#lista");

if (secaoLista) {
  secaoLista.addEventListener("click", (evento) => {
    const botaoRemover = evento.target.closest(".btn-remover");

    if (!botaoRemover) return;

    const card = botaoRemover.closest(".card");
    const id = Number(card.dataset.id);
    const filme = filmes.find((item) => item.id === id);

    if (!filme || !confirm(`Deseja remover "${filme.titulo}"?`)) return;

    filmes = filmes.filter((item) => item.id !== id);
    renderizarCards(filtrarPorStatus(filtroAtivo));
    atualizarTotal();
  });
}

const navegacao = document.querySelector("nav");

if (navegacao) {
  navegacao.addEventListener("click", (evento) => {
    const botaoFiltro = evento.target.closest("button[data-status]");

    if (!botaoFiltro) return;

    navegacao.querySelector(".ativo")?.classList.remove("ativo");
    botaoFiltro.classList.add("ativo");

    filtroAtivo = botaoFiltro.dataset.status;
    renderizarCards(filtrarPorStatus(filtroAtivo));
  });
}
