---
name: eval-writer
description: Design and write evaluators for LLM or agent behavior - golden sets, deterministic checks and calibrated LLM-as-judge rubrics - and wire them as regression tests. Use when changing prompts, tools, models or agent logic, or when asked to "add evals".
---

# Eval writer

## When to use
- A prompt, model, tool definition, retrieval step or agent flow is about to change and you need to know if quality regressed.

## Instructions
1. **Define the behavior under test** in one sentence and list failure modes you have actually seen (read logs, bug reports, transcripts). Evals come from real failures, not imagination.
2. **Build a golden set**: 20-50 cases to start, each with input, expected behavior (not only exact text), and tags (happy path, edge, adversarial, regression). Include every past bug as a case. Keep it in the repo as JSONL/YAML.
3. **Prefer deterministic checks** wherever possible: schema validity, required/forbidden substrings, tool-call sequence, numeric tolerance, latency/cost budgets, code that compiles and passes tests.
4. **Add an LLM judge only for what is left** (tone, faithfulness, helpfulness):
   - One criterion per judge, with a short rubric and 2-3 anchored examples (pass and fail).
   - Binary or 3-level scores, never 1-10.
   - Ask for reasoning first, then the verdict, as structured output.
   - Use a different (or stronger) model than the one being judged when possible.
5. **Calibrate the judge**: label 30+ cases by hand, measure agreement (precision/recall per class), and iterate the rubric until it matches humans. A judge you have not calibrated is a hallucination source; report its measured agreement alongside every score.
6. **Make it runnable**: one command (`npm run eval` / `make eval`) that prints per-tag pass rates and a diff against the last baseline, and exits non-zero on regression beyond a threshold. Pin the model/version and temperature.
7. **Guard against drift**: re-run on prompt/model changes (hook or CI), review failures weekly, and add each new production failure as a case.

## Report
Cases total / pass rate per tag / judge agreement with humans / regressions vs baseline / known gaps.
