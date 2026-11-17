---
name: property-tests
description: Write property-based and mutation tests that actually catch bugs (fast-check, Hypothesis, jqwik, proptest, Stryker, mutmut). Use for parsers, serializers, validators, state machines, pure logic, or to check that agent-written tests are meaningful.
---

# Property-based and mutation testing

## Instructions
1. **Find properties**, not examples: round-trip (`decode(encode(x)) == x`), idempotence (`f(f(x)) == f(x)`), invariants (sorted output stays a permutation), oracle comparison against a simple reference, "never throws on any input", monotonicity, commutativity.
2. **Pick the library** for the stack: `fast-check` (JS/TS), `Hypothesis` (Python), `jqwik` (JVM), `proptest` (Rust), `gopter`/`rapid` (Go).
3. **Write generators that reflect the domain** (valid ranges, realistic shapes) plus a deliberately nasty set (empty, huge, unicode, boundary values). Keep failing seeds as regression cases.
4. **Shrink and read the counterexample.** Fix the code or tighten the property with a justification, never by weakening it silently.
5. **Mutation-test the suite** (`Stryker`, `mutmut`, `PIT`, `cargo-mutants`) on the changed module. Surviving mutants mean tests that would not notice a bug: add or strengthen tests for them.
6. **Report** properties added / counterexamples found / mutation score before and after / survivors left and why.

Keep runs fast: bound iterations in the default run, and run larger budgets in CI nightly.
