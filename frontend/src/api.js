import { filmesIniciais } from "./data/filmes.js";

export async function listar(simularFalha = false) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (simularFalha) {
    throw new Error("Não foi possível carregar os filmes.");
  }

  return filmesIniciais;
}
