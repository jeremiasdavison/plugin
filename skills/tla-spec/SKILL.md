---
name: tla-spec
description: Decide whether a design deserves a TLA+ model and, if so, write and model-check a small spec (TLC) for concurrency, retries, idempotency, queues or state machines. Use for flows with multiple actors, ordering or failure modes that tests struggle to reach.
---

# TLA+ spec (only when it earns its keep)

## Is it worth it? (decide first)
Write a spec when the design has **concurrency, asynchronous messages, retries/timeouts, idempotency, leader/ownership, multi-device or multi-service flows, or a non-trivial state machine** and a bug would be costly or hard to test.

**Do not** write one for CRUD endpoints, simple transformations, UI layout, or code whose behavior is fully visible in a single function. Say so and use tests instead.

## Instructions
1. **State the question** as properties: safety ("never two owners", "no message lost or duplicated") and, if needed, liveness ("every request eventually completes").
2. **Model only what matters.** Small state: a few processes, bounded queues, a handful of values. Abstract away everything else.
3. **Write the spec** (`specs/<name>.tla` + `<name>.cfg`): `VARIABLES`, `Init`, named actions, `Next` as a disjunction of them, `Spec`, then each property as an `INVARIANT` (or `PROPERTY` for liveness). Include failure actions (crash, timeout, duplicate delivery, reordering) explicitly.
4. **Run TLC** (`java -jar tla2tools.jar -config <name>.cfg <name>.tla`, or the TLA+ Toolbox / VS Code extension). Install via the project's preferred tool manager; do not assume Java is present.
5. **Prove the check bites**: weaken the design (remove the guard, drop the dedupe) and confirm TLC finds a counterexample. A property that cannot fail is worthless.
6. **Translate counterexamples** into a plain-language step list and, where possible, a regression test against the real code.
7. **Keep it honest**: record what the model leaves out, and re-check it when the verified code changes.

## If pstack is installed
Use its `/statechart` skill to render the model as a Mermaid statechart with the shortest path to each rule violation, and its formal-verification skills to generate and maintain project-local verification. This skill only decides *whether* and writes the first model.

## Report
Properties checked / states explored / counterexamples found (with step lists) / what the model does not cover.
