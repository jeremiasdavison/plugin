---
name: harden-from-mistake
description: Turn a mistake an agent just made (or keeps making) into an enforceable check - a lint rule, type constraint, dependency rule or test - instead of a note in AGENTS.md. Use after a bug, a review comment, or a repeated anti-pattern.
---

# Harden from mistake

Guidance that lives only in prose gets ignored or goes stale. Mistakes should be made impossible, or at least loudly detectable.

## Instructions
1. **Name the mistake class**, not the instance: "importing main-process code from the renderer", "swallowing errors in catch", "non-idempotent retry handler".
2. **Pick the strongest enforcement that fits**, strongest first:
   1. Architecture: make the wrong thing unrepresentable (module boundary, API shape).
   2. Types: tighter types, branded types, exhaustive switches.
   3. Lint / static check: ESLint rule or `no-restricted-*`, `ast-grep` rule, `dependency-cruiser` / `import-linter` / ArchUnit boundary, Semgrep rule, Ruff rule.
   4. Test: a regression test or a property test.
   5. Docs: last resort, and only with a pointer to where it is enforced.
3. **Write the check** in the project's existing tooling. Prefer config over a new dependency.
4. **Make the error message actionable.** It must say what to do instead ("use `fetchWithRetry`; raw `fetch` is banned here because ..."), so an agent can fix it without extra context.
5. **Prove it bites.** Show the rule failing on a minimal bad example and passing on the fix. Then run it across the repo and triage the existing violations (fix, or record as known debt with a count).
6. **Record it** in a short table (`docs/enforcement.md` or equivalent): mistake class -> enforcer -> where it runs (editor, hook, CI).

## Don'ts
- Don't add a suppression to get green.
- Don't write a rule so broad it creates noise; scope it with globs.
