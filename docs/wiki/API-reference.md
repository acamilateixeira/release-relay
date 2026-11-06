# API reference

This page documents the runnable contract in the repository. Start it with `node demo/server.mjs`. The base URL is `http://127.0.0.1:4201`. The fixture uses synthetic data, listens only on loopback and clears its records when restarted.

| Method and path | Success | Meaning |
| --- | --- | --- |
| `GET /api/runs` | `200` | List the synthetic workflow runs. |
| `POST /api/handoffs` | `201` | Publish the reviewed fixture commit and return its handoff ID. |
| `GET /api/handoffs/{id}` | `200` | Retrieve an existing handoff. |
| `DELETE /api/handoffs/{id}` | `200` | Revoke the handoff. The response contains `"revoked": true`. |

## Example

```sh
curl -i http://127.0.0.1:4201/api/handoffs \
  -H 'Content-Type: application/json' \
  -d '{"commit":"demo-verified-commit","siteVerified":true}'
```

The response includes `id`, `source`, `commit`, `workflow`, `conclusion`, `site` and `siteVerified`. The local fixture returns `422` with `verified_commit_required` if the review is incomplete or the commit does not match. Unknown and revoked IDs both return `404` with `not_found`.

[Postman / Insomnia collection](https://github.com/acamilateixeira/release-relay/blob/main/docs/postman.collection.json) · [Production security requirements](Security-and-privacy.md)
