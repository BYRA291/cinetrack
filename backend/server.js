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

function validarFilme(dados, exigindoTituloEAno) {
  const erros = [];
  const possuiTitulo = typeof dados.titulo === "string" && dados.titulo.trim() !== "";
  const ano = dados.ano;
  const nota = dados.nota;
  const status = dados.status;

  if (exigindoTituloEAno && !possuiTitulo) {
    erros.push("Título é obrigatório");
  }
  if (exigindoTituloEAno && (ano === undefined || ano === null || ano === "")) {
    erros.push("Ano é obrigatório");
  }
  if (ano !== undefined && ano !== null && ano !== "" &&
      (!Number.isInteger(Number(ano)) || Number(ano) < 1888 || Number(ano) > 2100)) {
    erros.push("Ano deve ser um número inteiro entre 1888 e 2100");
  }
  if (nota !== undefined && nota !== null && nota !== "" &&
      (!Number.isInteger(Number(nota)) || Number(nota) < 1 || Number(nota) > 5)) {
    erros.push("Nota deve ser um número inteiro entre 1 e 5");
  }
  if (status !== undefined && !["assistido", "assistindo", "quero"].includes(status)) {
    erros.push("Status deve ser assistido, assistindo ou quero");
  }

  return erros;
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

app.get("/tmdb/search", async (req, res) => {
  const chave = process.env.TMDB_API_KEY;
  const consulta = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (!chave) {
    return res.status(503).json({ erro: "TMDB_API_KEY não configurada" });
  }

  if (!consulta) {
    return res.status(400).json({ erro: "Informe o parâmetro q" });
  }

  try {
    const parametro = new URLSearchParams({
      api_key: chave,
      query: consulta,
      language: "pt-BR",
    });
    const resposta = await fetch(
      `https://api.themoviedb.org/3/search/movie?${parametro}`,
    );

    if (!resposta.ok) {
      return res.status(resposta.status).json({ erro: "Erro ao consultar o TMDB" });
    }

    const dados = await resposta.json();
    res.json(dados.results ?? []);
  } catch {
    res.status(502).json({ erro: "Não foi possível consultar o TMDB" });
  }
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
  const dados = req.body && typeof req.body === "object" ? req.body : {};
  const erros = validarFilme(dados, true);
  if (erros.length > 0) {
    return res.status(400).json({ erro: erros[0], erros });
  }

  const filmes = lerFilmes();
  const filme = {
    id: gerarId(filmes),
    titulo: dados.titulo.trim(),
    ano: Number(dados.ano),
    genero: dados.genero ?? "",
    nota: dados.nota === undefined || dados.nota === null || dados.nota === ""
      ? 0
      : Number(dados.nota),
    status: dados.status ?? "quero",
    comentario: dados.comentario ?? "",
    poster: dados.poster ?? "",
  };

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
  const combinado = { ...existente, ...dados, id };
  const erros = validarFilme(combinado, true);
  if (erros.length > 0) {
    return res.status(400).json({ erro: erros[0], erros });
  }

  const atualizado = {
    ...combinado,
    titulo: combinado.titulo.trim(),
    ano: Number(combinado.ano),
    nota: Number(combinado.nota),
  };
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
