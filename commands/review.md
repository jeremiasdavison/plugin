---
name: review
description: Review the current changes with the reviewer agent, using lint/type/test results as ground truth.
---

# /review

1. Determine the change set (uncommitted changes, or the branch diff against the default branch).
2. Delegate to the `reviewer` agent with that scope.
3. Present its report unchanged: Verified findings, Not verified, Suggested enforcement.
4. Ask which findings to fix; do not fix anything automatically.
