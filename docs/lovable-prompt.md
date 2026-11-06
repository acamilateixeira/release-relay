# Release Relay — first build brief

Build Release Relay, an English-first handoff tool for solo developers shipping small sites. Create three responsive screens: project list, project detail, and read-only handoff.

Use an explicitly labeled sample based on the public Sorteador Web project. On the project page, separate the GitHub workflow outcome, the manual site review, and the handoff publication state. Show the selected commit, a short release checklist, and the last sync timestamp. Include empty, loading, temporary failure, revoked connection, and ready-to-publish states. A commit change resets manual verification. On the public handoff, show the checked scope, review date, and next step.

Plan the Cloud data model and permission boundaries before persistence. Put the future GitHub App behind a typed connector. Keep sample state labeled and avoid creating simulated OAuth success. In the next iteration, add real server-side GitHub authorization and prove access isolation with two accounts. Keep API secrets server-side and use fixtures for repeatable failure demos.
