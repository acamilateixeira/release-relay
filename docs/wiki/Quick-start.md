# Quick start

## Run the repository's contract demo

Use Node.js 22 or newer. The server listens on loopback, stores test data in memory and uses synthetic workflow evidence.

```sh
git clone https://github.com/acamilateixeira/release-relay.git
cd release-relay
node --test demo/server.test.mjs
node demo/server.mjs
```

Open <http://127.0.0.1:4201/> and choose **Try the demo** to use the checklist, open the client view and revoke the link. To check the API directly, run:

```sh
curl --fail http://127.0.0.1:4201/api/runs
```

Import [the Postman collection](https://github.com/acamilateixeira/release-relay/blob/main/docs/postman.collection.json) into Postman or Insomnia. Run in order to list the fixture, reject an incomplete review, publish a handoff, read it, revoke it and confirm that it returns HTTP 404. Restarting the server clears its data. See [Testing and QA](Testing-and-QA.md) for product acceptance checks.

## Where to find the Lovable app

The product is being built in the [Release Relay Lovable project](https://lovable.dev/projects/85c3e7fc-0935-4252-8bd0-0617998d22b1). Editor access follows workspace permissions. Follow [Deployment and operations](Deployment-and-operations.md) for the release procedure.

[Início rápido em português](Inicio-rapido.md)
