# Multi-Agent Adapter Feature Spec

Status: Implemented on the post-`0.5.2` package line.

## Background And Goals

Repositories may be used from multiple coding agents whose persistent instruction file conventions
differ. Harnessize should let a repository keep one authoritative harness document while still
helping agent-specific tools discover that guidance.

Goals:

- Keep `AGENTS.md` as the single source of truth for durable harness guidance.
- Create only thin adapter files for tools that need or benefit from agent-specific entrypoints.
- Avoid overwriting existing user instruction files.
- Cover the initial supported agent set by default during harnessization.

## User Stories

- As a repository owner, I can run `npx -y harnessize@latest` and get a thin `AGENTS.md` handoff.
- As a repository owner, I can run `npx -y harnessize@latest` and get Claude Code, Cursor, and
  Codex converging on the same harness guidance.
- As an agent, I can inspect generated adapter files and understand that substantive harness
  changes belong in `AGENTS.md`, not in each adapter.
- As a maintainer, I can add future adapter definitions without changing the SSOT model.

## Product And Interaction Design

The default init flow writes `AGENTS.md` when it is absent. It does not overwrite an existing
`AGENTS.md`; instead it reports a skipped task so the acting agent can preserve user content.

The default multi-agent flow is:

```sh
npx -y harnessize@latest
```

When enabled, harnessize plans and writes:

- `AGENTS.md`: canonical harness guidance and root context bootstrap instructions.
- `CLAUDE.md`: Claude Code adapter that imports `AGENTS.md`.
- `.cursor/rules/harnessize.mdc`: Cursor project rule that applies always and references
  `AGENTS.md`.

Codex needs no extra adapter because Codex uses `AGENTS.md` directly. The CLI still reports this as
a native adapter behavior so users understand why no Codex-specific file was created.

`--dry-run` reports planned, native, and skipped files without writing them. `--json` emits the same
plan and result data as structured JSON.

## Feature Design And Functional Breakdown

- `src/index.ts` owns the harness artifact registry, plan creation, file writing, skip behavior, and
  human-readable formatting.
- `src/cli.ts` owns CLI parsing and applies the default harness plan.
- Generated adapters must stay thin. They should point to `AGENTS.md` and contain only
  tool-specific routing notes.
- Existing files are skipped rather than overwritten. This applies to `AGENTS.md`, `CLAUDE.md`, and
  `.cursor/rules/harnessize.mdc`.
- Adapter support starts with Codex, Claude Code, and Cursor because those tools have clear public
  file conventions and can preserve `AGENTS.md` as the SSOT.

## Semantic Use Cases

### Default Harnessization

- Case: Default init creates canonical harness guidance plus thin adapter files.
  Preconditions: The target repository has no harness instruction files, and the user runs
  harnessize.
  Action: The CLI applies the harness plan.
  Assertions: `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules/harnessize.mdc` are created, and output
  explains that Codex uses `AGENTS.md` directly.

- Case: Existing instruction files are preserved.
  Preconditions: The target repository already has `AGENTS.md`, `CLAUDE.md`, or
  `.cursor/rules/harnessize.mdc`.
  Action: The CLI applies a harness plan that includes the existing path.
  Assertions: Existing file contents are not overwritten, and the plan marks that task as skipped.

### Multi-Agent Adapter Flow

- Case: Default harnessization creates thin adapters that delegate to `AGENTS.md`.
  Preconditions: The target repository has no harness instruction files, and the user runs
  harnessize.
  Action: The CLI applies the harness plan.
  Assertions: `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules/harnessize.mdc` are created; both
  adapter files reference `AGENTS.md`; no generated adapter duplicates the full harness guidance.

- Case: Codex is represented as native `AGENTS.md` support instead of an extra file.
  Preconditions: The user runs harnessize.
  Action: The CLI creates or plans adapter tasks.
  Assertions: The plan includes Codex as a native behavior pointing to `AGENTS.md`, and no
  Codex-specific adapter file is written.

- Case: Dry-run previews adapter work without changing the repository.
  Preconditions: The target repository has no harness instruction files, and the user runs
  harnessize with `--dry-run`.
  Action: The CLI creates the harness plan.
  Assertions: The plan marks writeable files as planned, no files are created, and existing files
  would still be reported as skipped.

## References And Artifacts

- [Decision 0012](../decisions/0012-multi-agent-adapter-ssot.md): Multi-agent adapter SSOT
  decision, research, and implementation summary.
- OpenAI Codex AGENTS.md guide: `https://developers.openai.com/codex/guides/agents-md`
- Claude Code memory docs: `https://docs.anthropic.com/en/docs/claude-code/memory`
- Cursor rules docs: `https://cursor.com/docs/rules.md`
- Runtime source: `src/index.ts`
- CLI source: `src/cli.ts`
- Unit tests: `test/index.test.ts` and `test/cli.test.ts`

## Boundaries

This feature does not create a full cross-agent compatibility matrix. New adapters should be added
only when the target tool has a stable, public project-instruction convention and the adapter can
remain a thin pointer to `AGENTS.md`.
