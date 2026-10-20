---
description: Audit the portfolio against docs/spec.md with a fresh-context verifier
---

Spawn the `spec-verifier` subagent to audit this codebase against
`docs/spec.md`, then relay its verdict. Fix anything it reports as NOT MET or
PARTIAL before reporting the build as complete.
