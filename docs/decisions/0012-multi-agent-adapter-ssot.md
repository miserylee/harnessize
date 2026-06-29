# Decision 0012: Multi-Agent Adapter SSOT

Date: 2026-06-30

## Context

The user asked harnessize to guide agents through multi-agent repository adaptation during
harnessization. Different coding agents use different repository instruction entrypoints, but
duplicating harness guidance into every agent-specific file would make the guidance stale quickly.

## Material Research Findings

- OpenAI Codex documents `AGENTS.md` as the project instruction file for Codex.
  Source: `https://developers.openai.com/codex/guides/agents-md`
- Claude Code documents `CLAUDE.md` project memory and supports importing other files with `@`
  syntax, which lets `CLAUDE.md` delegate to `AGENTS.md`.
  Source: `https://docs.anthropic.com/en/docs/claude-code/memory`
- Cursor documents both project rules in `.cursor/rules/*.mdc` and root/subdirectory
  `AGENTS.md`; its rules guidance recommends referencing files instead of copying their contents.
  Source: `https://cursor.com/docs/rules.md`

## Decisions

`AGENTS.md` remains the single source of truth for durable harness guidance.

Default harnessization creates `AGENTS.md` and thin multi-agent adapter files when absent:

```sh
npx -y harnessize@latest
```

The first adapter set covers the requested, publicly documented targets:

- Codex: native `AGENTS.md` support, so no extra file is written.
- Claude Code: `CLAUDE.md` imports `AGENTS.md`.
- Cursor: `.cursor/rules/harnessize.mdc` is an always-applied project rule that references
  `AGENTS.md`.

Existing instruction files are never overwritten. Harnessize reports them as skipped so the acting
agent can preserve user content and merge a small handoff manually if needed.

## Rejected Alternatives

- Generate full guidance into every agent-specific file. Rejected because it breaks the SSOT model
  and creates stale copies.
- Add an adapter opt-in flag. Rejected after user correction because harnessize should make
  multi-agent repository coverage the default behavior instead of requiring users to know which
  switch to pass.
- Add a broad adapter matrix immediately. Rejected because adapters should be added only when the
  target tool has a stable public convention and can delegate cleanly to `AGENTS.md`.

## Discussion Record

### Turn 1 - Request multi-agent adaptation - 2026-06-30 00:39 +08:00

- User signal: The user said harnessize should guide agents to adapt repositories for multiple
  agents such as Codex, Claude Code, and Cursor, using adapter files that point to `AGENTS.md` so
  harness content has one source of truth.
- Agent work: Existing CLI init behavior, feature docs, decisions, and official agent rule
  conventions were inspected. The implementation path was scoped to real init writing plus thin
  adapter generation.
- Sources:
  - `src/index.ts`
  - `src/cli.ts`
  - `test/index.test.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `docs/features/context-topics.md`
  - `docs/decisions/0001-thin-agent-facing-harness.md`
  - `https://developers.openai.com/codex/guides/agents-md`
  - `https://docs.anthropic.com/en/docs/claude-code/memory`
  - `https://cursor.com/docs/rules.md`
- Decisions: Implement `AGENTS.md` as the canonical harness file; add thin adapters for Claude Code
  and Cursor; represent Codex as native `AGENTS.md` support.
- Open questions: Future adapter candidates remain open and should be evaluated individually
  against stable public file conventions.

### Turn 2 - Make adapter coverage default - 2026-06-30 01:02 +08:00

- User signal: The user said not to add an adapters parameter and to cover all supported agents
  directly.
- Agent work: The opt-in CLI flags and plan field were removed. Default harnessization now creates
  `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules/harnessize.mdc` when absent, while still reporting
  Codex as native `AGENTS.md` support.
- Sources:
  - `src/index.ts`
  - `src/cli.ts`
  - `test/index.test.ts`
  - `test/cli.test.ts`
  - `docs/features/multi-agent-adapters.md`
- Decisions: Multi-agent adapter coverage is default behavior, not an explicit CLI mode.
- Open questions: None for the current Codex, Claude Code, and Cursor adapter set.

## Follow-Up Items

- Consider future adapters such as other CLI agents only when their repository instruction file
  conventions are stable and can preserve `AGENTS.md` as the canonical source.
