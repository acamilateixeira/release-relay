# Início rápido

O Release Relay reúne a execução do GitHub, a revisão manual de uma versão do site e um resumo de entrega para o cliente.

Use Node.js 22 ou superior para rodar a demo HTTP do repositório:

```sh
git clone https://github.com/acamilateixeira/release-relay.git
cd release-relay
node --test demo/server.test.mjs
node demo/server.mjs
```

Abra `http://127.0.0.1:4201/api/runs` ou importe a [coleção Postman](https://github.com/acamilateixeira/release-relay/blob/main/docs/postman.collection.json). A sequência mostra uma execução fictícia, rejeita uma revisão incompleta, publica um resumo, revoga o link e verifica a resposta 404. A demo usa memória e reinicia vazia.

A interface do produto fica no [projeto Lovable](https://lovable.dev/projects/85c3e7fc-0935-4252-8bd0-0617998d22b1), com acesso pelo workspace. Consulte [testes](Testing-and-QA.md) e [publicação e operação](Deployment-and-operations.md) para acompanhar a passagem da demo para o piloto.

[English quick start](Quick-start.md)
