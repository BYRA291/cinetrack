# API REST do CineTrack

A API executa na porta `3000` por padrão.

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/filmes` | Lista filmes; aceita `q` e `status` |
| `GET` | `/filmes/:id` | Busca um filme pelo identificador |
| `POST` | `/filmes` | Cria um filme |
| `PUT` | `/filmes/:id` | Atualiza um filme |
| `DELETE` | `/filmes/:id` | Remove um filme |
| `GET` | `/stats` | Retorna totais e média das notas |
| `GET` | `/tmdb/search?q=nome` | Busca filmes no TMDB, opcional |

## Corpo de um filme

```json
{
  "titulo": "Nome do filme",
  "ano": 2026,
  "genero": "Drama",
  "nota": 5,
  "status": "quero",
  "comentario": "Comentário opcional",
  "poster": "https://..."
}
```

## Validações

- `titulo` é obrigatório em `POST` e não pode ficar vazio.
- `ano` é obrigatório em `POST`, inteiro e deve estar entre `1888` e `2100`.
- `nota`, quando informada, deve ser um inteiro entre `1` e `5`.
- `status`, quando informado, deve ser `assistido`, `assistindo` ou `quero`.
- Dados inválidos devolvem `400` com `{ "erro": "...", "erros": [...] }`.
- Recursos inexistentes devolvem `404`.

## Exemplos

```powershell
curl.exe -i http://localhost:3000/filmes
curl.exe -i -X POST http://localhost:3000/filmes `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Filme teste\",\"ano\":2026,\"nota\":5,\"status\":\"quero\"}'
curl.exe -i -X PUT http://localhost:3000/filmes/7 `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Filme atualizado\",\"ano\":2026,\"nota\":4,\"status\":\"assistido\"}'
curl.exe -i -X DELETE http://localhost:3000/filmes/7
```
