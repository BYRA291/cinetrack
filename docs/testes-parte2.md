# Testes da API - Marco 2

## Preparação

Na raiz do projeto:

```powershell
cd backend
npm install
npm run seed
npm run dev
```

Em outro terminal:

```powershell
cd frontend
npm install
npm run dev
```

Abra o endereço exibido pelo Vite e execute o CRUD pela interface.

## Roteiro automático

Com a API parada em outra porta ou processo, o teste inicia um servidor próprio:

```powershell
cd backend
npm run test:api
```

O teste cria um filme, tenta operações inválidas, atualiza o filme, remove-o
e confirma o `404` posterior. Ao terminar, restaura o JSON original.

## Casos HTTP

| Caso | Procedimento | Resultado esperado | Resultado observado |
| --- | --- | --- | --- |
| POST inválido | Enviar título válido, ano `2026`, nota `7` e status `inventado` | `400` com os erros de nota e status | Passou no teste automático |
| POST válido | Criar um filme com dados válidos | `201` e o objeto criado com `id` | Passou no teste automático |
| PUT inválido | Atualizar o filme criado com nota `7` e status `inventado` | `400` com os erros de validação | Passou no teste automático |
| PUT válido | Atualizar título, nota e status | `200` com o objeto atualizado | Passou no teste automático |
| DELETE válido | Remover o filme criado | `204` sem corpo | Passou no teste automático |
| Recurso removido | Buscar o identificador removido | `404` | Passou no teste automático |

## Teste ponta a ponta pela interface

1. Execute `npm run seed` no backend para iniciar com seis filmes.
2. Suba o backend com `npm run dev`.
3. Suba o frontend com `npm run dev`.
4. Confirme que os seis filmes aparecem na grade.
5. Adicione um filme e confirme que o novo card aparece.
6. Edite o mesmo filme e confirme a atualização.
7. Remova o filme e confirme que ele desaparece.
8. Recarregue o navegador e confirme a persistência das alterações no backend.
