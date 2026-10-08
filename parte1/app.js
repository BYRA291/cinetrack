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
let editandoId = null;

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

function criarCard(filme) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.dataset.id = filme.id;

  const poster = document.createElement("img");
  poster.src = filme.poster;
  poster.alt = `Pôster do filme ${filme.titulo}`;
  poster.width = 80;
  poster.height = 120;

  const titulo = document.createElement("h2");
  titulo.textContent = filme.titulo;

  const informacoes = document.createElement("p");
  informacoes.textContent = `${filme.ano} · ${filme.genero}`;

  const avaliacao = document.createElement("p");
  avaliacao.textContent = "Nota: ";

  const iconesNota = document.createElement("span");
  iconesNota.setAttribute("role", "img");
  iconesNota.setAttribute("aria-label", `Nota: ${filme.nota} de 5`);
  iconesNota.textContent = estrelas(filme.nota);
  avaliacao.append(iconesNota);

  const badge = document.createElement("span");
  badge.classList.add("badge", filme.status);
  badge.textContent = rotuloStatus(filme.status);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  const botaoEditar = document.createElement("button");
  botaoEditar.type = "button";
  botaoEditar.classList.add("btn-editar");
  botaoEditar.textContent = "Editar";

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.classList.add("btn-remover");
  botaoRemover.textContent = "Remover";

  acoes.append(botaoEditar, botaoRemover);
  card.append(poster, titulo, informacoes, avaliacao, badge, acoes);

  return card;
}

function renderizarCards(lista) {
  const secaoLista = document.querySelector("#lista");

  if (!secaoLista) return;

  const titulo = document.createElement("h2");
  titulo.textContent = "Filmes";

  const fragmento = document.createDocumentFragment();
  lista.forEach((filme) => fragmento.append(criarCard(filme)));

  secaoLista.replaceChildren(titulo, fragmento);
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

function gerarId() {
  const ids = filmes.map((filme) => filme.id);
  return ids.length === 0 ? 1 : Math.max(...ids) + 1;
}

function validarFilme(filme) {
  const erros = [];

  if (!filme.titulo.trim()) erros.push("Informe o título.");
  if (!Number.isInteger(filme.ano) || filme.ano < 1888 || filme.ano > 2030) {
    erros.push("Informe um ano entre 1888 e 2030.");
  }
  if (!filme.genero.trim()) erros.push("Informe o gênero.");
  if (!['quero', 'assistindo', 'assistido'].includes(filme.status)) {
    erros.push("Selecione um status válido.");
  }
  if (!Number.isInteger(filme.nota) || filme.nota < 1 || filme.nota > 5) {
    erros.push("Informe uma nota entre 1 e 5.");
  }

  if (filme.poster) {
    try {
      new URL(filme.poster);
    } catch {
      erros.push("Informe uma URL de pôster válida.");
    }
  }

  return erros;
}

const modal = document.querySelector("#modal");
const formulario = document.querySelector("#form-filme");
const errosForm = document.querySelector("#erros-form");
const tituloModal = document.querySelector("#titulo-modal");

function mostrarErros(erros) {
  errosForm.replaceChildren();

  if (erros.length === 0) return;

  const lista = document.createElement("ul");
  erros.forEach((erro) => {
    const item = document.createElement("li");
    item.textContent = erro;
    lista.append(item);
  });
  errosForm.append(lista);
}

function abrir() {
  formulario.reset();
  editandoId = null;
  mostrarErros([]);
  tituloModal.textContent = "Adicionar filme";
  modal.hidden = false;
  formulario.elements.titulo.focus();
}

function fechar() {
  modal.hidden = true;
  editandoId = null;
  mostrarErros([]);
}

function abrirEdicao(filme) {
  abrir();
  editandoId = filme.id;
  tituloModal.textContent = "Editar filme";

  formulario.elements.titulo.value = filme.titulo;
  formulario.elements.ano.value = filme.ano;
  formulario.elements.genero.value = filme.genero;
  formulario.elements.poster.value = filme.poster;
  formulario.elements.status.value = filme.status;
  formulario.elements.nota.value = filme.nota;
  formulario.elements.comentario.value = filme.comentario;
}

renderizarCards(filmes);
atualizarTotal();

document.querySelector("#btn-adicionar").addEventListener("click", abrir);
document.querySelector("#btn-cancelar").addEventListener("click", fechar);

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && !modal.hidden) fechar();
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = Object.fromEntries(new FormData(formulario));
  const filme = {
    ...dados,
    titulo: dados.titulo.trim(),
    ano: Number(dados.ano),
    genero: dados.genero.trim(),
    poster: dados.poster.trim(),
    nota: Number(dados.nota),
    comentario: dados.comentario.trim()
  };
  const erros = validarFilme(filme);

  if (erros.length > 0) {
    mostrarErros(erros);
    return;
  }

  if (editandoId === null) {
    filmes = [...filmes, { ...filme, id: gerarId() }];
  } else {
    filmes = filmes.map((item) =>
      item.id === editandoId ? { ...item, ...filme } : item
    );
  }

  renderizarCards(filtrarPorStatus(filtroAtivo));
  atualizarTotal();
  fechar();
});

const secaoLista = document.querySelector("#lista");

if (secaoLista) {
  secaoLista.addEventListener("click", (evento) => {
    const botaoEditar = evento.target.closest(".btn-editar");
    const botaoRemover = evento.target.closest(".btn-remover");

    if (botaoEditar) {
      const card = botaoEditar.closest(".card");
      const id = Number(card.dataset.id);
      const filme = filmes.find((item) => item.id === id);

      if (filme) abrirEdicao(filme);
      return;
    }

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
