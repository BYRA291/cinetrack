# Requisitos de rotas do CineTrack

## Rotas e operações esperadas

| Método HTTP | Rota | Descrição |
| --- | --- | --- |
| GET | / | Carrega a página inicial com a lista de filmes |
| GET | /index.html | Exibe a tela principal do CineTrack |
| GET | /adicionar.html | Exibe o formulário para adicionar filme |
| GET | /style.css | Carrega os estilos da interface |
| GET | /app.js | Carrega o JavaScript do comportamento |
| GET | /filmes | Lista todos os filmes |
| GET | /filmes/:id | Busca um filme específico |
| POST | /filmes | Cria um novo filme |
| PUT | /filmes/:id | Atualiza um filme existente |
| DELETE | /filmes/:id | Remove um filme |
| GET | /api/filmes | API para consulta de filmes |
| GET | /api/filmes/:id | API para consulta de um filme específico |

## Requisição de API relacionada ao projeto

A operação de busca de dados em API pode ser representada assim:

```javascript
fetch('/api/filmes')
  .then((response) => response.json())
  .then((dados) => console.log(dados));
```

Essa rota corresponde à tabela acima e está alinhada com o uso de REST, em que a URL identifica o recurso e o método HTTP expressa a operação.
