# Troubleshooting and glossary

| Symptom | Check first |
| --- | --- |
| Connection refused on port 4201 | Start `node demo/server.mjs` from the repository root. Verify the port is available and the terminal reports the loopback address. |
| Publish returns HTTP 422 | Verify the selected commit matches the review and the site verification is complete. |
| An existing link now returns 404 | Check the owner view for revocation. The local fixture also loses data when the process restarts. |
| No GitHub runs appear | Check the repo is public, Actions has executed, and branch or workflow filters match. |
| GitHub sync fails intermittently | Check rate-limit response headers and the latest backend logs. Retry after the indicated interval. |
| A second account can see another owner's data | Treat it as a release blocker. Capture the synthetic record ID and failing policy check. |

| Term | Meaning |
| --- | --- |
| Commit SHA | Git revision recorded in the evidence and review. |
| Workflow run | One execution of a GitHub Actions workflow. |
| Manual review | Checklist for the selected revision and its site. |
| Handoff | Client-facing snapshot of the reviewed scope and evidence. |
| Revocation | Owner action that disables access through the share link. |
| Fixture | Controlled synthetic data for tests and demonstrations. |
