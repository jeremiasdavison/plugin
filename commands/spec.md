---
name: spec
description: Decide whether the current design warrants a TLA+ model and, if so, write and model-check a small spec.
---

# /spec

1. Follow the `tla-spec` skill's "Is it worth it?" check on the design under discussion. If it is plain CRUD or a single-function behavior, say so and stop.
2. Otherwise state the safety/liveness properties, write the spec and config under `specs/`, run TLC, and prove the check bites with a deliberately weakened variant.
3. Report properties, states explored, counterexamples as plain-language step lists, and what the model leaves out.
