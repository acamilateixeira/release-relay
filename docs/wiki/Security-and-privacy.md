# Security and privacy

| Boundary | Release check |
| --- | --- |
| Owner data | An authenticated owner can access their own projects and reviews. A second account cannot read, edit, publish or revoke the owner's records. Test by calling the backend as both accounts. |
| Client link | Possession of a live token grants read-only access to the snapshot. Use an unguessable token, expose only allowed fields, and verify anonymous access fails after revocation. |
| Input | Validate repo identifiers and restrict provider requests to the GitHub API host. Accept safe HTTP(S) URLs for links shown to users. |
| Secrets | Keep provider credentials and service keys on the server. Browser configuration uses only intentionally public values. |
| Demo | Label synthetic runs. Use separate sample state so it cannot alter a user's projects or create client-facing records. |
| Telemetry | Track steps and status codes with minimal data. Keep share tokens, emails, credentials and client notes out of analytics. |

Review anonymous data access, storage and auth behavior before enabling a public pilot. Keep any finding in the issue tracker with synthetic reproduction data. For sensitive findings, use the repository's private reporting option when it is enabled.

[Architecture and data](Architecture-and-data.md) · [Testing and QA](Testing-and-QA.md)
