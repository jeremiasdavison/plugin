---
name: code-review
description: Review a change for correctness, maintainability and security, using the project's own lint/type/test results as ground truth. Use when preparing a PR, auditing a diff, or asked to "review this".
---

# Code review with evidence

## When to use
- Before opening or merging a PR, or when asked to review a diff or branch.

## Instructions
1. **Establish ground truth first.** Find and run the project's lint, type-check and test commands. Record the exact commands and results. Findings that a linter already reports are not "review findings": fix them and move on.
2. **Read the diff against its intent.** State in one sentence what the change is supposed to do. Flag anything in the diff that does not serve that sentence.
3. **Hunt for real defects**, in this order: wrong behavior, unhandled error/edge cases, concurrency/ordering/retry problems, security issues (injection, authz, secrets), data loss or migration risks, then maintainability.
4. **Prove, don't assert.** A finding must include a concrete failing input, a command that reproduces it, or a precise line reference with the reasoning. Drop findings you cannot support.
5. **Skip style and naming** unless it hides a bug. If a style issue keeps recurring, hand it to the `harden-from-mistake` skill so a lint rule catches it next time.
6. **Check the tests**: would they fail if the change were broken? Point out behavior that has no test.
7. **Report** as: Verified findings (ranked, with evidence) / Not verified (what you could not run or check) / Suggested enforcement (rules worth adding).

## Output rules
- Never claim checks passed unless you ran them in this session.
- Do not apply fixes unless asked; list them.
