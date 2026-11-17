# verify-kit

A Cursor plugin that helps agent-written code **earn trust**: instead of reading every diff, make correct behavior the default and prove it with evidence.

Inspired by the AI Engineer Code Summit talk "All Code Is Slop (Except Mine)" and the [pstack](https://github.com/cursor/plugins/tree/main/pstack) plugin (MIT). verify-kit does not copy pstack; it covers complementary ground and works well next to it.

## What's inside

| Type | Name | Purpose |
|---|---|---|
| Skill | `code-review` | Review with lint/type/test output as ground truth; only proven findings |
| Skill | `harden-from-mistake` | Turn a mistake into a lint rule, type, boundary check or test |
| Skill | `architecture-constraints` | Executable layer and dependency boundaries, banned APIs |
| Skill | `eval-writer` | Golden sets, deterministic checks, calibrated LLM judges |
| Skill | `tla-spec` | Decide if a TLA+ model is worth it; write and model-check it |
| Skill | `runtime-verify` | Run the real app and capture evidence |
| Skill | `property-tests` | Property-based and mutation testing |
| Agent | `reviewer` | Independent read-only reviewer |
| Agent | `fuzz-user` | Exploratory tester that uses the app like a hostile user |
| Commands | `/review` `/harden` `/evidence-pr` `/eval` `/spec` | Entry points for the above |
| Rules | `lint-before-done`, `no-patch-comments`, `evidence-before-review` | Light guardrails |
| Hook | `afterFileEdit` | Runs the project's own linter on the edited file (best effort, never blocks) |

## Works well with pstack

pstack already provides `/statechart` (renders TLA+ models as Mermaid statecharts), formal-verification skill generators, `/interrogate` (multi-model adversarial review) and `/no-comments`. If installed, verify-kit's `tla-spec` skill defers to them for rendering and maintenance.

## Install locally

Copy or symlink this folder to `~/.cursor/plugins/local/verify-kit`, then run **Developer: Reload Window** in Cursor.

## Hook notes

The `afterFileEdit` hook runs `node ./scripts/lint-changed.mjs`. It needs Node on PATH, only uses locally installed tools (`eslint`, `biome`, `ruff`) and exits 0 always. Hook payload field names were not verified against Cursor's reference; if lint does not trigger, check the payload and adjust `scripts/lint-changed.mjs`.

## Publishing checklist

- [ ] Replace `author` in `.cursor-plugin/plugin.json` and the copyright line in `LICENSE`.
- [ ] Add `assets/logo.svg` and set `"logo": "assets/logo.svg"` in the manifest.
- [ ] Push to a public Git repo (plugins must be open source).
- [ ] Submit the repo at https://cursor.com/marketplace/publish.

## License

MIT
