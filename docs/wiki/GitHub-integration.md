# GitHub integration

## First integration

For the public-repository MVP, read workflow runs through the GitHub Actions REST API. The request originates server-side. Validate the repository owner, name and branch or workflow selector. Build the request against the fixed GitHub API host and use a request timeout. Project the response to the minimum data needed for evidence.

The public sample repository is [sorteador-web](https://github.com/acamilateixeira/sorteador-web). The fixture used by the public repository is marked synthetic. A live import should show the source, run link, full SHA and when it was last fetched.

| GitHub state | What the workspace should show |
| --- | --- |
| Successful sync | Current run list and timestamp. |
| No matching runs | Empty state and a way to change workflow or branch. |
| Private, missing or inaccessible repo | Clear explanation that this flow accepts accessible public repositories. |
| Rate limit, timeout or provider error | Error and retry information. If previous evidence is shown, label it with the time of the last successful sync. |

A GitHub App for private repositories is a later milestone. At that point, verify installation access server-side, use read-only scopes, and handle removal and revocation. Git sync for Release Relay's own code is a separate workspace feature.

[GitHub REST workflow runs](https://docs.github.com/en/rest/actions/workflow-runs) · [Lovable Git sync](https://docs.lovable.dev/integrations/github)
