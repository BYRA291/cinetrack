# Testes da Parte 1

Roteiro de validação manual da aplicação em `parte1/index.html`. Resultados registrados após executar os cenários no navegador.

| Caso | Procedimento | Resultado esperado | Resultado observado |
| --- | --- | --- | --- |
| 1. Adicionar filme válido | Adicionar um filme válido e salvar. | O card aparece sem recarregar a página. | Passou: “Filme de Teste” apareceu imediatamente; total de 7 cards. |
| 2. Ano fora da faixa | Informar ano menor que 1888 ou maior que 2030 e salvar. | A interface mostra erro e não salva o filme. | Passou: ano 1887 exibiu erro; lista permaneceu com 7 cards e o modal aberto. |
| 3. Editar filme | Editar um card existente e salvar. | O mesmo card é atualizado, sem duplicação. | Passou: “A Origem” virou “A Origem Editada”; continuou existindo apenas um card, total de 7. |
| 4. Cancelar remoção | Remover um filme e cancelar a confirmação. | O filme continua na lista. | Passou: cancelar a confirmação preservou “Filme de Teste”. |
| 5. Busca e status | Pesquisar um título e selecionar um status. | Os critérios são combinados. | Passou: “Duna” + “Assistindo” mostrou 1 filme; mantendo a busca e trocando para “Quero assistir”, mostrou 0. |
| 6. Persistência | Alterar a lista e recarregar a página. | A alteração permanece. | Passou: após recarregar, “Filme de Teste” e “A Origem Editada” permaneceram. |
| 7. Fechar modal | Abrir o modal e usar Escape; repetir com Cancelar. | O modal fecha em ambos os casos. | Passou: Escape e Cancelar fecharam o modal. |
| 8. Primeira visita | Remover `cinetrack:filmes` do armazenamento local e recarregar. | Os seis filmes canônicos aparecem. | Passou: chave removida; os seis filmes canônicos, incluindo “Parasita”, foram carregados. |

## Ordenação

O seletor de ordenação oferece título, ano e nota. Validação no navegador: ano crescente manteve o conteúdo persistido inalterado; nota decrescente produziu `5, 5, 4` e permaneceu selecionada ao mudar para o status “Assistido”; título correspondeu a `localeCompare` em `pt-BR`, inclusive com “Época de Teste”. A ordenação ocorre sobre uma cópia do resultado filtrado.