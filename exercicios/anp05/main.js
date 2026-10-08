import { filmesIniciais } from "./filmes.js";
import {
  mediaNotas,
  contagemPorStatus,
  ordenarPorNota
} from "./estatisticas.js";

console.log("Média das notas:", mediaNotas(filmesIniciais));
console.log("Contagem por status:", contagemPorStatus(filmesIniciais));

const filmesOrdenados = ordenarPorNota(filmesIniciais);
console.log("Filmes ordenados por nota:", filmesOrdenados);
console.log("Array original depois da ordenação:", filmesIniciais);
