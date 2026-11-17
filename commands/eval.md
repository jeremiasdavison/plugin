---
name: eval
description: Create or run evaluators (golden set, deterministic checks, calibrated LLM judge) for the prompt, agent or model behavior being changed.
---

# /eval

1. If the repo already has an eval command, run it and report per-tag pass rates versus the last baseline.
2. If not, follow the `eval-writer` skill to create a golden set, deterministic checks and, only if needed, a calibrated judge, plus a single runnable command.
3. Report cases, pass rate, judge agreement with humans, regressions and gaps.
