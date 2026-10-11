# CineTrack

Catálogo de filmes feito com HTML, CSS e JavaScript, sem dependências externas de execução.

## Executar

Abra `parte1/index.html` no navegador ou inicie um servidor local na pasta `parte1`:

```powershell
cd parte1
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

## Funcionalidades

- Cadastro, edição e remoção de filmes com validação e confirmação.
- Busca por título combinada com filtros de status.
- Ordenação por título, ano ou nota, sem alterar a lista armazenada.
- Persistência local em `localStorage` na chave `cinetrack:filmes`.
- Dados canônicos iniciais: seis filmes carregados quando ainda não há dados salvos.
- Modal de cadastro/edição fechável por Cancelar ou Escape.

## Validação

O roteiro dos oito cenários da atividade e seus resultados está em [`docs/testes-parte1.md`](docs/testes-parte1.md).