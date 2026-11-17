---
name: architecture-constraints
description: Encode architectural boundaries (layers, forbidden imports, banned APIs) as executable checks so agents cannot violate them. Use when setting up a project for agent work or after a boundary violation.
---

# Architecture constraints

Agents imitate whatever patterns exist in the codebase. Constrain the codebase, not just the prompt.

## Instructions
1. **Map the intended structure**: layers, packages, process boundaries (e.g. UI vs server, main vs renderer, domain vs infrastructure). Ask the user if it is not evident.
2. **Pick the checker that matches the stack:**
   - JS/TS: `dependency-cruiser`, ESLint `no-restricted-imports` / `import/no-restricted-paths`, `eslint-plugin-boundaries`.
   - Python: `import-linter` contracts.
   - Java/Kotlin: ArchUnit. Go: `depguard` / `go-arch-lint`. Rust: `cargo-deny`, module visibility.
   - Any language: `ast-grep` or Semgrep rules for banned APIs and patterns.
3. **Write contracts** for: allowed dependency directions, forbidden cross-boundary imports, APIs that are banned outside a designated module (for example raw `fetch`, direct `process.env`, ad-hoc `useEffect`), and public entry points per package.
4. **Make failures instructive**: each rule's message states the approved alternative.
5. **Run it in three places**: on file edit (fast subset), pre-commit, CI (full).
6. **Baseline legacy violations** explicitly (count and list) so new violations fail while old ones are tracked, and reduce the baseline over time.
7. **Clean the patterns agents would copy**: before large agent runs, fix or remove the worst anti-patterns, since they will be reproduced.
