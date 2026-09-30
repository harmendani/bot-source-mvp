# Instruções do projeto

API em Fastify 5 com TypeScript e Node.js. Ponto de entrada: `src/server.ts`.

## Comandos

- Gerenciador de pacotes: Yarn 4 (`yarn`). Não use `npm` nem crie `package-lock.json`.
- Checagem de tipos: `yarn tsc --noEmit`
- Ainda não existem scripts de build, dev, teste ou lint. Ao adicioná-los, atualize esta seção.

## Convenções

- Responda e comente em português; nomes de código em inglês.
- TypeScript estrito: evite `any`, prefira tipos explícitos nos handlers.
- Toda rota deve ter schema de entrada (body, params, querystring) e de resposta.
- Organize por plugins do Fastify; use `fastify-plugin` só quando for preciso compartilhar decorators.
- Trate erros com `reply.code()` ou `setErrorHandler`, sem expor stack trace.
- Sempre use `await` em operações assíncronas; sem promises soltas.

## Segurança

- Nunca commitar `.env` ou segredos. Configuração via variáveis de ambiente.
- Trate toda entrada do usuário como não confiável.

## Fluxo de trabalho

- Faça mudanças pequenas, uma funcionalidade por vez.
- Depois de editar, rode a checagem de tipos e os testes (quando existirem).
- Explique brevemente o que foi alterado e por quê.
