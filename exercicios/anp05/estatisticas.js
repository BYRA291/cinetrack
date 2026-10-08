export function mediaNotas(lista) {
  if (lista.length === 0) return 0;

  const soma = lista.reduce((total, filme) => total + filme.nota, 0);
  return Number((soma / lista.length).toFixed(1));
}

export function contagemPorStatus(lista) {
  const contagemInicial = {
    assistido: 0,
    assistindo: 0,
    quero: 0
  };

  return lista.reduce((contagem, filme) => ({
    ...contagem,
    [filme.status]: (contagem[filme.status] ?? 0) + 1
  }), contagemInicial);
}

export function ordenarPorNota(lista) {
  return [...lista].sort((filmeA, filmeB) => filmeB.nota - filmeA.nota);
}
