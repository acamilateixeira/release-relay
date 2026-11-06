![Release Relay — execução no GitHub, revisão do site e entrega ao cliente](docs/cover.svg)

# Release Relay

[English](README.md) · **Português** · **Status · demo local no navegador e versão Lovable em desenvolvimento**

[![CI](https://github.com/acamilateixeira/release-relay/actions/workflows/ci.yml/badge.svg)](https://github.com/acamilateixeira/release-relay/actions/workflows/ci.yml)

[Wiki do projeto](https://github.com/acamilateixeira/release-relay/wiki) · [Documentação versionada](docs/wiki/Home.md)

**Envie ao cliente um link que mostra o que foi entregue, o que você conferiu e qual é o próximo passo.**

Quem entrega um site precisa reunir a execução do GitHub, o endereço publicado e o checklist antes de avisar o cliente. O Release Relay reúne essas evidências em uma entrega. O primeiro roteiro usa o [Sorteador](https://acamilateixeira.github.io/sorteador-web/), um app Angular já publicado a partir do GitHub.

## A primeira versão

1. Conecte o GitHub, selecione um repositório público e um workflow e consulte as últimas execuções.
2. Escolha uma execução e vincule a revisão ao commit. Confira o site manualmente e registre os testes.
3. Compartilhe um resumo de leitura com link revogável. O cliente vê o escopo, as evidências, a data da revisão e o próximo passo sem precisar de conta.

A interface terá três telas: projetos, detalhe do projeto e entrega. Resultado do workflow, verificação manual do site e publicação da entrega têm estados próprios. Trocar o commit reinicia a revisão. Uma execução verde, por si só, não comprova qual versão está no ar.

## Arquitetura proposta

```mermaid
flowchart LR
    Owner[Desenvolvedora] --> UI[React e TypeScript]
    UI --> Cloud[Lovable Cloud]
    Cloud --> DB[(Projetos, revisões e entregas)]
    Cloud --> App[GitHub App com acesso de leitura]
    App --> Actions[API do GitHub Actions]
    Client[Cliente] --> Link[Entrega de leitura revogável]
    Link --> Cloud
```

| Decisão | Motivo |
| --- | --- |
| **Lovable + React/TypeScript** | Prototipar estados vazio, sincronizando, falha, desconectado e pronto para entrega. Sincronizar o código com GitHub para revisão e CI. |
| **Lovable Cloud** | Usar autenticação, banco, segredos, funções e hospedagem gerenciados. Políticas no banco garantem o acesso por dono do projeto. |
| **GitHub App** | Limitar o acesso aos repositórios selecionados e à leitura dos metadados do workflow. Validar instalação e acesso no servidor. Atualizar sob demanda e exibir quando os dados foram sincronizados. |
| **Resumo revogável** | Publicar um conjunto explícito de evidências para o cliente. A responsável pelo projeto pode desativar o link. |

[Lovable Cloud](https://docs.lovable.dev/features/cloud) · [Sincronização Git](https://docs.lovable.dev/integrations/github) · [API do GitHub Actions](https://docs.github.com/en/rest/actions/workflow-runs)

## O que precisa funcionar

- Importar uma execução real. Mostrar o que acontece se o acesso for revogado ou o GitHub ficar temporariamente indisponível.
- Demonstrar que uma segunda conta não consegue ler nem alterar o projeto e que o link revogado para de abrir.
- Observar se uma pessoa identifica o commit revisado, entende o que foi conferido e consegue compartilhar. Medir os passos entre conexão e primeira publicação e registrar resultados após sessões reais.

## Desenvolvimento com Lovable

Começar pelo [prompt do protótipo](docs/lovable-prompt.md), conectar o Lovable Cloud e adicionar a integração. Registrar o que a IA gerou, o que mudou na revisão e quais testes confirmam o resultado. A integração real com o GitHub e a publicação no Lovable são os próximos marcos.

## Rodar a demo do contrato

Use Node.js 22. Inicie a demo local e rode os testes HTTP.

```bash
node demo/server.mjs
# Em outro terminal
node --test demo/server.test.mjs
```

Abra [a demo local](http://127.0.0.1:4201/) e selecione **Try the demo**. Troque de execução para ver a revisão reiniciar, preencha o checklist, abra o link de cliente e revogue. Os links funcionam enquanto o servidor local está ativo.

Importe a [coleção Postman](docs/postman.collection.json) no Postman ou Insomnia. Ela lista uma execução fictícia, rejeita uma versão sem revisão, publica a entrega e confere que o link revogado retorna 404. A demo usa memória e um resultado fictício do GitHub. O projeto no Lovable vai adicionar a interface, autenticação e integração real.
