const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

function lerFilmes() {
  const caminhoArquivo = path.join(__dirname, "data", "filmes.json");
  const conteudo = fs.readFileSync(caminhoArquivo, "utf8");

  return JSON.parse(conteudo);
}

app.get("/filmes", (req, res) => {
  const filmes = lerFilmes();
  const resultado = req.query.status
    ? filmes.filter((filme) => filme.status === req.query.status)
    : filmes;

  res.json(resultado);
});

app.get("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filme = lerFilmes().find((item) => item.id === id);

  if (!filme) {
    return res.status(404).json({ erro: "Filme não encontrado" });
  }

  res.json(filme);
});

if (require.main === module) {
  const porta = process.env.PORT || 3000;

  app.listen(porta, () => {
    console.log(`CineTrack API disponível em http://localhost:${porta}`);
  });
}

module.exports = app;
