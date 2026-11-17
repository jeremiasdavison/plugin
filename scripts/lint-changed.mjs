#!/usr/bin/env node
// verify-kit: afterFileEdit hook.
// Lints the edited file with the project's own linter, if one is configured.
// Best effort and never blocks: it always exits 0 and only reports on stderr.
// Uses only locally installed tools (no downloads).

import { existsSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

let payload = {};
try {
  payload = JSON.parse(readStdin() || "{}");
} catch {
  payload = {};
}

const file = payload.file_path ?? payload.filePath ?? payload.path ?? process.argv[2];
if (!file) process.exit(0);

const cwd = process.cwd();
const abs = resolve(cwd, file);
if (!existsSync(abs)) process.exit(0);

const has = (...names) => names.some((n) => existsSync(resolve(cwd, n)));
const ext = extname(abs).toLowerCase();

function run(cmd, args) {
  const r = spawnSync(cmd, args, {
    cwd,
    encoding: "utf8",
    timeout: 30_000,
    shell: process.platform === "win32",
  });
  if (r.error || r.status === null) return; // tool missing or timed out: stay silent
  const out = `${r.stdout ?? ""}${r.stderr ?? ""}`.trim();
  if (r.status !== 0 && out) {
    process.stderr.write(`[verify-kit] ${cmd} reported problems in ${file}:\n${out}\n`);
  }
}

const jsLike = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];

if (jsLike.includes(ext)) {
  if (has("biome.json", "biome.jsonc")) {
    run("npx", ["--no-install", "biome", "lint", abs]);
  } else if (has(".eslintrc", ".eslintrc.js", ".eslintrc.cjs", ".eslintrc.json", ".eslintrc.yml", "eslint.config.js", "eslint.config.mjs", "eslint.config.cjs", "eslint.config.ts")) {
    run("npx", ["--no-install", "eslint", abs]);
  }
} else if (ext === ".py") {
  if (has("ruff.toml", ".ruff.toml", "pyproject.toml")) {
    run("ruff", ["check", abs]);
  }
}

process.exit(0);
