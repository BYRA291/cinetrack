const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

function caminhoFilmes() {
  return path.join(__dirname, "data", "filmes.json");
}

function lerFilmes() {
  const conteudo = fs.readFileSync(caminhoFilmes(), "utf8");

  return JSON.parse(conteudo);
}

function salvarFilmes(lista) {
  fs.writeFileSync(caminhoFilmes(), JSON.stringify(lista, null, 2), "utf8");
}

function gerarId(filmes) {
  if (filmes.length === 0) return 1;
  return Math.max(...filmes.map((filme) => filme.id)) + 1;
}

app.get("/filmes", (req, res) => {
  const filmes = lerFilmes();
  const termoBusca = typeof req.query.q === "string"
    ? req.query.q.trim().toLocaleLowerCase("pt-BR")
    : "";
  const resultado = filmes
    .filter((filme) => !req.query.status || filme.status === req.query.status)
    .filter((filme) =>
      !termoBusca || filme.titulo.toLocaleLowerCase("pt-BR").includes(termoBusca),
    );

  res.json(resultado);
});

app.get("/stats", (req, res) => {
  const filmes = lerFilmes();
  const porStatus = filmes.reduce((contagens, filme) => {
    contagens[filme.status] = (contagens[filme.status] || 0) + 1;
    return contagens;
  }, {});
  const somaNotas = filmes.reduce((soma, filme) => soma + Number(filme.nota), 0);
  const mediaNotas = filmes.length === 0
    ? 0
    : Number((somaNotas / filmes.length).toFixed(1));

  res.json({ total: filmes.length, porStatus, mediaNotas });
});

app.get("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filme = lerFilmes().find((item) => item.id === id);

  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  res.json(filme);
});

app.post("/filmes", (req, res) => {
  const { titulo, ano } = req.body || {};
  if (typeof titulo !== "string" || titulo.trim() === "" || ano === undefined || ano === null || ano === "") {
    return res.status(400).json({ erro: "Título e ano são obrigatórios" });
  }

  const filmes = lerFilmes();
  const filme = {
    id: gerarId(filmes),
    titulo: titulo.trim(),
    ano: Number(ano),
    genero: req.body.genero ?? "",
    nota: req.body.nota === undefined ? 0 : Number(req.body.nota),
    status: req.body.status ?? "quero",
    comentario: req.body.comentario ?? "",
    poster: req.body.poster ?? "",
  };

  if (!Number.isFinite(filme.ano) || !Number.isFinite(filme.nota)) {
    return res.status(400).json({ erro: "Ano e nota devem ser números válidos" });
  }

  filmes.push(filme);
  salvarFilmes(filmes);
  res.status(201).json(filme);
});

app.put("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmes = lerFilmes();
  const existente = filmes.find((filme) => filme.id === id);

  if (!existente) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  const dados = req.body && typeof req.body === "object" ? req.body : {};
  const atualizado = { ...existente, ...dados, id };
  const atualizados = filmes.map((filme) => filme.id === id ? atualizado : filme);
  salvarFilmes(atualizados);
  res.json(atualizado);
});

app.delete("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmes = lerFilmes();
  if (!filmes.some((filme) => filme.id === id)) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  salvarFilmes(filmes.filter((filme) => filme.id !== id));
  res.status(204).end();
});

if (require.main === module) {
  const porta = process.env.PORT || 3000;

  app.listen(porta, () => {
    console.log(`CineTrack API disponível em http://localhost:${porta}`);
  });
}

module.exports = app;
