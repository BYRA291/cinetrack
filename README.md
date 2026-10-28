# CineTrack

Catálogo de filmes feito com HTML, CSS e JavaScript, sem dependências externas de execução.

## Executar

Abra `parte1/index.html` no navegador ou inicie um servidor local na pasta `parte1`:

```powershell
cd parte1
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

## Frontend React (Aula 1)

O projeto React com Vite fica em `frontend/`, separado da aplicação original
em `parte1/`. Para executá-lo:

```powershell
cd frontend
npm install
npm run dev
```

O componente `Titulo` está em `src/components/Titulo.jsx` e é composto por
`App` em `src/App.jsx`. O ano do rodapé é exibido dinamicamente com JSX.

## Funcionalidades

- Cadastro, edição e remoção de filmes com validação e confirmação.
- Busca por título combinada com filtros de status.
- Ordenação por título, ano ou nota, sem alterar a lista armazenada.
- Persistência local em `localStorage` na chave `cinetrack:filmes`.
- Dados canônicos iniciais: seis filmes carregados quando ainda não há dados salvos.
- Modal de cadastro/edição fechável por Cancelar ou Escape.
- Navegação acessível por teclado, foco contido no modal e estados dos filtros anunciados por leitores de tela.
- Pôsteres iniciais reais servidos pela CDN da TMDB, sem exigir chave de API no navegador.

## Persistência e busca

Os filmes são serializados em JSON no `localStorage`, usando a chave `cinetrack:filmes`. Na primeira visita — ou se os dados armazenados forem inválidos — a aplicação carrega os seis filmes iniciais.

A busca aguarda 300 ms após a digitação antes de atualizar a lista. Ela ignora acentos e diferenças entre letras maiúsculas e minúsculas e pode ser combinada com os filtros de status e a ordenação.

Para restaurar os dados iniciais, execute no console do navegador:

```javascript
localStorage.removeItem("cinetrack:filmes");
location.reload();
```

## Acessibilidade

A interface usa HTML semântico, rótulos associados aos campos, mensagens dinâmicas anunciadas, indicação programática do filtro ativo e gerenciamento de foco no modal. As cores foram ajustadas para contraste e animações são reduzidas quando essa preferência está habilitada no sistema.

Para conferir com o Lighthouse, sirva a pasta localmente, abra as ferramentas do desenvolvedor e execute a auditoria de acessibilidade sobre `http://localhost:8000/`. A meta do projeto é pontuação igual ou superior a 90.

## Validação

O roteiro dos oito cenários da atividade e seus resultados está em [`docs/testes-parte1.md`](docs/testes-parte1.md).
