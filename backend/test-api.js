const fs = require("node:fs");
const path = require("node:path");
const app = require("./server");

const arquivo = path.join(__dirname, "data", "filmes.json");
const dadosOriginais = fs.readFileSync(arquivo, "utf8");

function verificar(condicao, mensagem) {
  if (!condicao) throw new Error(mensagem);
}

async function executar() {
  const servidor = app.listen(0);
  await new Promise((resolve) => servidor.once("listening", resolve));
  const base = `http://127.0.0.1:${servidor.address().port}`;

  try {
    const invalidoPost = await fetch(`${base}/filmes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: "Teste inválido", ano: 2026, nota: 7, status: "inventado" }),
    });
    verificar(invalidoPost.status === 400, "POST inválido deveria devolver 400");
    const errosPost = await invalidoPost.json();
    verificar(errosPost.erros.length === 2, "POST inválido deveria listar nota e status");

    const criadoResponse = await fetch(`${base}/filmes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Teste ponta a ponta",
        ano: 2026,
        genero: "Teste",
        nota: 5,
        status: "quero",
      }),
    });
    verificar(criadoResponse.status === 201, "POST válido deveria devolver 201");
    const criado = await criadoResponse.json();

    const invalidoPut = await fetch(`${base}/filmes/${criado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nota: 7, status: "inventado" }),
    });
    verificar(invalidoPut.status === 400, "PUT inválido deveria devolver 400");

    const atualizadoResponse = await fetch(`${base}/filmes/${criado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: "Teste ponta a ponta atualizado", nota: 4, status: "assistido" }),
    });
    verificar(atualizadoResponse.status === 200, "PUT válido deveria devolver 200");

    const removidoResponse = await fetch(`${base}/filmes/${criado.id}`, {
      method: "DELETE",
    });
    verificar(removidoResponse.status === 204, "DELETE válido deveria devolver 204");

    const inexistenteResponse = await fetch(`${base}/filmes/${criado.id}`);
    verificar(inexistenteResponse.status === 404, "GET inexistente deveria devolver 404");

    console.log("Teste ponta a ponta da API passou: POST, PUT, DELETE e erros 400/404.");
  } finally {
    fs.writeFileSync(arquivo, dadosOriginais, "utf8");
    await new Promise((resolve, reject) =>
      servidor.close((erro) => erro ? reject(erro) : resolve()),
    );
  }
}

executar().catch((erro) => {
  console.error(erro);
  process.exitCode = 1;
});
