# CineTrack

## Autores

- Bruno Yozo Ricci Assakawa — RA140076
- Yuri Gabriel Leandro de Paula — RA139460

O projeto tem duas etapas, mantidas em pastas próprias:

- **Parte 1:** catálogo em HTML, CSS e JavaScript, com a coleção salva no navegador.
- **Parte 2:** frontend React conectado a uma API Node/Express, com a coleção salva pelo backend.

As partes são independentes. Para executar a Parte 1, não é necessário iniciar o backend. Para usar a Parte 2, inicie a API e o frontend React em terminais separados.

## Parte 1 — HTML, CSS e JavaScript

A versão original está em `parte1/`. Ela não precisa de `npm` nem de dependências externas.

### Executar

No PowerShell, inicie um servidor local:

```powershell
cd parte1
python -m http.server 8000
```

Abra `http://localhost:8000/` no navegador.

### O que esta parte oferece

- Cadastro, edição e remoção de filmes no navegador.
- Busca por título combinada com filtros por status e ordenação por título, ano ou nota.
- Persistência de toda a coleção em `localStorage`, na chave `cinetrack:filmes`.
- Modal de cadastro e edição, validação de campos e navegação por teclado.
- Interface acessível com HTML semântico, anúncios dinâmicos e gerenciamento de foco no modal.

Para restaurar os seis filmes iniciais, abra o console do navegador na página da Parte 1 e execute:

```javascript
localStorage.removeItem("cinetrack:filmes");
location.reload();
```

O roteiro de validação da Parte 1 está em [`docs/testes-parte1.md`](docs/testes-parte1.md). Para conferir a acessibilidade com o Lighthouse, sirva a pasta como acima e execute a auditoria em `http://localhost:8000/`.

## Parte 2 — React e API Node

O frontend React fica em `frontend/` e a API Express em `backend/`. A Parte 2 precisa dos dois serviços em execução.

### 1. Iniciar a API

No PowerShell:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

A API ficará disponível em `http://localhost:3000`. O arquivo `.env.example` define a porta. A rota opcional `/tmdb/search` requer uma chave `TMDB_API_KEY` em `backend/.env`.

Os filmes ficam em `backend/data/filmes.json`. Para recriar a coleção inicial de seis filmes, execute `npm run seed` dentro de `backend/`.

### 2. Iniciar o frontend

Em outro terminal, também no PowerShell:

```powershell
cd frontend
npm install
npm run dev
```

Abra o endereço que o Vite mostrar, normalmente `http://localhost:5173`. O frontend usa `http://localhost:3000` por padrão. Para apontá-lo a outra API, crie `frontend/.env` com:

```text
VITE_API_URL=http://localhost:3000
```

### O que esta parte oferece

- Cadastro, edição e remoção de filmes pela API REST, com validação no backend.
- Busca por título combinada com filtros por status no React.
- Persistência da coleção em `backend/data/filmes.json`.
- Persistência das preferências de busca e status no navegador, na chave `cinetrack:filtros`.
- Estados de carregamento, erro e lista vazia.

A documentação das rotas está em [`docs/api.md`](docs/api.md). O roteiro de validação da API e do fluxo pela interface está em [`docs/testes-parte2.md`](docs/testes-parte2.md). A API inclui `GET /filmes` (com `q` e `status`), `GET /filmes/:id`, `POST /filmes`, `PUT /filmes/:id`, `DELETE /filmes/:id`, `GET /stats` e `/tmdb/search?q=termo`.
