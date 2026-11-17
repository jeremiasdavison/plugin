---
name: evidence-pr
description: Assemble a pull request description backed by evidence (checks run, runtime proof, specs, what is not verified).
---

# /evidence-pr

1. Summarize the change in two sentences: what and why.
2. Run lint, type-check and tests; list exact commands and results.
3. For behavior changes, run the `runtime-verify` skill and link the evidence files or embed screenshots.
4. For concurrency/state-machine changes, include the `tla-spec` result or state why none applies.
5. For bug fixes, show the test that failed before and passes after.
6. Produce the PR body with sections: **Summary**, **Checks run**, **Evidence**, **Not verified**, **Risk and rollback**. Never leave "Not verified" empty by omission.
7. Do not open the PR; show the text and ask.
