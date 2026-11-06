# Deployment and operations

| Environment | Use |
| --- | --- |
| Local contract fixture | Use the local browser preview and HTTP contract with synthetic data and no account. |
| Lovable preview | Review the product UI, Cloud configuration and changes before exposing them to users. |
| Published pilot | Host the verified product at a shareable URL and test it with agency-owned public projects. |

## Before publishing

1. Run the contract tests and confirm the application build and type checks.
2. Check schema migrations, owner policies, auth redirects and anonymous snapshot behavior in preview.
3. Check that the client-facing page works from a clean browser session and that revocation takes effect.
4. Confirm repository integration and a fallback when GitHub rate limits or fails.
5. Publish from Lovable and run the same smoke check against the public URL. Add the URL and tested revision to the release notes.

Use Lovable Cloud for auth, database and functions. Keep service credentials in secrets. GitHub code sync creates a new repository, so agree which repository is canonical and how changes are mirrored before enabling sync. Keep pilot data separate from fixtures.

## Incident and rollback

Record the affected environment, revision and first observed time. Check auth redirects, backend logs and the upstream API status. If a change breaks the handoff, restore a known working version of the application and verify whether schema changes are compatible with it. Re-run anonymous link and revocation checks. Use [Troubleshooting and glossary](Troubleshooting-and-glossary.md) to classify the incident.

[Lovable backend](https://docs.lovable.dev/features/cloud) · [Lovable Git sync](https://docs.lovable.dev/integrations/github)
