---
name: harden
description: Turn the mistake just made (or described) into an enforceable lint rule, type constraint, boundary check or test.
---

# /harden

1. Identify the mistake class from the conversation or from the text the user gives after the command.
2. Follow the `harden-from-mistake` skill: choose the strongest enforcement, write it, prove it fails on a bad example, run it across the repo.
3. Update the enforcement table (mistake class -> enforcer -> where it runs).
4. Report what was added and the existing violations found.
