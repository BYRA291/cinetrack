const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers,
    },
  });

  if (!resposta.ok) {
    let mensagem = "Não foi possível concluir a operação.";

    try {
      const dados = await resposta.json();
      if (dados.erro) mensagem = dados.erro;
    } catch {
      // Mantém a mensagem padrão quando o servidor não retorna JSON.
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) return null;
  return resposta.json();
}

export function listar() {
  return requisitar("/filmes");
}

export function criar(dados) {
  return requisitar("/filmes", {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export function atualizar(id, dados) {
  return requisitar(`/filmes/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export function remover(id) {
  return requisitar(`/filmes/${id}`, {
    method: "DELETE",
  });
}
