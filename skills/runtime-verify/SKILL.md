---
name: runtime-verify
description: Run the real application and verify a change the way a user would, capturing screenshots, logs or recordings as evidence. Use after UI, API or CLI changes, or when asked to "prove it works".
---

# Runtime verification

Tests and types do not prove the feature works. Run it.

## Instructions
1. **Find how to launch** the app (README, `package.json` scripts, `docker compose`, `.cursor/launch.json`). Start it in the background and wait for readiness; do not guess ports.
2. **Write the user journey** being verified as 3-7 concrete steps, including one unhappy path.
3. **Drive it for real**: browser (Playwright / Chrome DevTools Protocol / the IDE browser tool) for web UI; `curl`/HTTP client for APIs; the actual binary for CLIs. Do not mock the layer under test.
4. **Capture evidence** at each step: screenshot, response body, exit code, relevant log lines. Save under `evidence/<date>-<change>/`.
5. **Check for silent failures**: console errors, failed network requests, server error logs, unhandled rejections.
6. **Clean up**: stop processes, remove test data you created.
7. **Report**: steps run / evidence paths / anything that behaved unexpectedly / what was not verified.

## Notes
- Never use real credentials or production endpoints; use test data and local or staging environments.
- If the repo has no scripted way to drive the app, propose a small `scripts/verify-*` harness rather than repeating manual steps.
- If pstack is installed, its verification-skill generator can produce a project-specific version of this.
