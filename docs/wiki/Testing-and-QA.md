# Testing and QA

## Reproduce the current contract

```sh
node --test demo/server.test.mjs
```

The integration test starts a disposable HTTP server and verifies that an unreviewed or mismatched commit cannot be published, that the saved handoff is tied to the selected commit, and that a revoked link returns 404. The [API collection](https://github.com/acamilateixeira/release-relay/blob/main/docs/postman.collection.json) exercises the same public demo contract against a running server.

| Scenario | Expected result |
| --- | --- |
| Read synthetic runs | HTTP 200 and a record labeled `fixture`. |
| Publish a review for a different commit or an unchecked site | HTTP 422. |
| Publish the verified commit | HTTP 201 with a handoff ID. |
| Read and revoke the handoff | HTTP 200 before revocation. HTTP 404 on a subsequent read. |

## Local browser walkthrough

Run `node demo/server.mjs` and open <http://127.0.0.1:4201/demo>. Check the items, switch runs and confirm that the checklist clears. Complete the new review, open the handoff in a separate browser context, revoke it and reload the client page. It should display an unavailable message and return HTTP 404.

## Lovable acceptance checklist

1. Open the sample in a fresh browser session and confirm it is labeled as a demo.
2. Choose one run, check items, choose another run and verify the review resets.
3. With a real account, sync a public repository and compare the selected run and SHA with GitHub.
4. Publish a reviewed snapshot. Open the link in a separate browser context without signing in.
5. Use a second account to attempt reading and changing the owner's data.
6. Revoke the snapshot and check it in the separate browser again.
7. Try a nonexistent repository and exercise empty and error states. Check keyboard navigation and the mobile layout.

The repository contract and the Lovable acceptance checklist cover different surfaces. Record the commit, environment, date and observed results in the PR or release notes.
