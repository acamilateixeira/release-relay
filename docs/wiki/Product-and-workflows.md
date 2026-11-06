# Product and workflows

## People and jobs

- **Agency owner or developer.** Records the revision reviewed and communicates what is ready for the client.
- **Client.** Opens a read-only link and sees the reviewed scope, evidence, date, and next step.
- **Maintainer.** Owns configuration, verifies policies and responds to issues.

## Delivery sequence

1. Create a project with a public GitHub repository, workflow or branch, and the live site URL.
2. Sync Actions runs. Record the selected run ID and full commit SHA. A successful workflow confirms the CI result for that revision. The live site still needs a manual check.
3. Review the site and complete the checklist. Typical checks cover the home page, key paths and mobile layout. Change the selected run to start a separate review.
4. Publish a snapshot. The client page presents only the deliberately shared fields.
5. Revoke the link from the owner view when access should end. A revoked link returns the same not-found response as an unknown link.

A published snapshot is separate from later edits. A new revision requires a new review and a new snapshot. The local contract proves review, publishing and revocation on one synthetic run. Consult [Testing and QA](Testing-and-QA.md) for the full acceptance sequence.
