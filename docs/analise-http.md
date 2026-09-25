# Análise de tráfego HTTP - CineTrack

## Contexto

A página principal do projeto foi aberta em `http://localhost:8000/index.html` usando um servidor local do Python. Em seguida, foi possível observar no DevTools as requisições do navegador para o HTML, CSS, JavaScript e imagens do site. Também foram testados cenários reais de redirecionamento e de recurso inexistente.

## 1) Requisição principal da página

Ao abrir a home do CineTrack, o navegador faz uma requisição do tipo `GET` para a rota `/index.html`.

Resultado observado:

- Método: `GET`
- Rota: `/index.html`
- Status: `200 OK`
- Content-Type: `text/html`
- Content-Length: `7034`

Exemplo de cabeçalhos recebidos:

```http
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.13.6
Date: Fri, 25 Sep 2026 01:33:41 GMT
Content-type: text/html
Content-Length: 7034
Last-Modified: Fri, 25 Sep 2026 01:28:47 GMT
```

Isso confirma que a página foi entregue com sucesso e que o servidor respondeu com conteúdo HTML válido.

## 2) Recursos estáticos (Headers)

O navegador também carregou recursos estáticos do site. Abaixo estão três requisições registradas com o código de status e o `Content-Type` da resposta, conforme a aba `Headers` do DevTools.

### 2.1) CSS

- Método: `GET`
- Rota: `/style.css`
- Status: `200 OK`
- Content-Type: `text/css`

```http
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.13.6
Content-type: text/css
Content-Length: 7017
```

### 2.2) JavaScript

- Método: `GET`
- Rota: `/app.js`
- Status: `200 OK`
- Content-Type: `text/javascript`

```http
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.13.6
Content-type: text/javascript
Content-Length: 1516
```

### 2.3) Imagem

- Método: `GET`
- Rota: `/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg`
- Status: `200 OK`
- Content-Type: `image/jpeg`

```http
HTTP/1.1 200 OK
Date: Fri, 25 Sep 2026 01:33:42 GMT
Content-Type: image/jpeg
Content-Length: 22546
Cache-Control: public, max-age=31919000
```

Esses retornos mostram que a página depende de recursos estáticos com status bem-sucedido, o que é esperado em aplicações web simples.

## 3) Requisição para recurso inexistente

Foi solicitado um arquivo que não existe para verificar o comportamento do servidor em caso de erro.

- Método: `GET`
- Rota: `/arquivo-nao-existe`
- Status: `404 File not found`
- Content-Type: `text/html;charset=utf-8`

```http
HTTP/1.0 404 File not found
Server: SimpleHTTP/0.6 Python/3.13.6
Content-Type: text/html;charset=utf-8
Content-Length: 335
```

Esse exemplo mostra que o servidor responde corretamente com `404`, indicando que o recurso solicitado não existe.

## 4) Requisição de imagem remota

Também foi observado o carregamento de uma imagem externa de uma API de filmes, usada pelo pôster do filme.

- Método: `GET`
- Rota: `/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg`
- Status: `200 OK`
- Content-Type: `image/jpeg`

```http
HTTP/1.1 200 OK
Date: Fri, 25 Sep 2026 01:33:42 GMT
Content-Type: image/jpeg
Content-Length: 22546
Cache-Control: public, max-age=31919000
```

A imagem foi entregue com sucesso, com cache do lado do servidor, o que reduz a necessidade de nova transferência em visitas posteriores.

## 5) Requisição de API com `fetch`

A rota de API esperada para o projeto está documentada em [requisitos.md](requisitos.md). Segundo essa tabela, as operações de consulta do CineTrack usam o padrão REST:

- `GET /api/filmes` para listar filmes
- `GET /api/filmes/:id` para buscar um filme específico

Um exemplo no navegador pode ser representado assim:

```javascript
fetch('/api/filmes')
  .then((response) => {
    console.log('status:', response.status);
    console.log('content-type:', response.headers.get('content-type'));
    return response.json();
  })
  .then((dados) => console.log(dados));
```

Nesse contexto, a URL identifica o recurso (`/api/filmes`) e o método `GET` expressa a operação de leitura. Em uma API REST, o retorno esperado é `200 OK` com `Content-Type: application/json; charset=utf-8`.

## 6) Redirecionamento HTTP

O site de referência MDN também foi testado e mostrou um redirecionamento padrão:

- Método: `GET`
- Rota: `/pt-BR/docs/Web/HTTP/Overview`
- Status: `301 Moved Permanently`
- Localização: `/pt-BR/docs/Web/HTTP/Guides/Overview`

```http
HTTP/1.1 301 Moved Permanently
Location: /pt-BR/docs/Web/HTTP/Guides/Overview
Content-Type: text/plain; charset=utf-8
```

Esse comportamento indica que o recurso antigo foi movido para outro endereço e que o navegador precisa seguir a nova rota.

## Conclusão

A análise do tráfego HTTP do CineTrack mostrou que a aplicação usa requisições simples e bem definidas: o HTML, o CSS e o JavaScript são carregados com `GET` e status `200 OK`; um recurso inexistente gera `404`; e a imagem de pôster remota também chega com sucesso. A API do projeto, conforme a tabela de rotas em [requisitos.md](requisitos.md), usa `GET /api/filmes` para consultar recursos, e a URL identifica o recurso enquanto o método indica a operação. Em REST, isso é o comportamento correto: a rota informa o quê será acessado e o método informa como a operação será realizada. O uso de redirecionamento `301` também confirma como o protocolo HTTP orienta o navegador entre diferentes rotas, mantendo a navegação correta e consistente.
