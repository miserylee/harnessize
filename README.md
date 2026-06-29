# harnessize

<p align="center">
  <img src="assets/harnessize-promo.png" alt="harnessize promotional illustration">
</p>

`harnessize` is a CLI for preparing repositories for AI harness workflows.

```sh
npx -y harnessize@latest
```

The CLI exposes the command shape, context topics, build pipeline, tests, and release automation.
The default init flow creates a thin `AGENTS.md` harness handoff when one does not already exist.

## Usage

```sh
npx -y harnessize@latest [target] [options]
npx -y harnessize@latest context [topic]
```

Options:

- `--dry-run`: preview planned harnessization steps without writing files.
- `--json`: print the plan as JSON.
- `-h, --help`: show help.
- `-v, --version`: show the package version.

## Harnessization

By default, `harnessize` creates `AGENTS.md` as the repository's single source of truth for
agent-facing harness guidance. Existing instruction files are not overwritten; the CLI reports a
skip so the agent can merge a small harnessize handoff manually when needed.

Harnessize also creates thin adapter files by default so repositories behave consistently across
multiple coding agents:

```sh
npx -y harnessize@latest
```

This keeps `AGENTS.md` as the canonical harness document while adding thin routing files for tools
with different conventions:

- Codex uses `AGENTS.md` directly.
- Claude Code gets `CLAUDE.md`, which imports `AGENTS.md`.
- Cursor gets `.cursor/rules/harnessize.mdc`, an always-applied project rule that references
  `AGENTS.md`.

## Context Topics

Harnessize can provide progressive, agent-facing guidance without copying large manuals into the
target repository.

```sh
npx -y harnessize@latest context
npx -y harnessize@latest context brainstorm
npx -y harnessize@latest context grill
npx -y harnessize@latest context feature
npx -y harnessize@latest context caseset
npx -y harnessize@latest context verify
npx -y harnessize@latest context review
npx -y harnessize@latest context conduct
```

`context` prints the root agent-facing guidelines for using harnessize as a soft workflow
orchestrator. Focused topics add deeper guidance only when needed.

`brainstorm` is the first dogfooded topic. It guides analysis, research, discussion, clarification,
and ideation work while keeping user-facing responses concise and recording sourced turn-level
discussion summaries.

`grill` pressure-tests a concrete plan, design, architecture, PRD, or implementation approach before
execution.

`feature` guides feature lifecycle design and authoritative feature production materials, including
feature specs and semantic use cases.

`caseset` guides semantic use case set maintenance inside feature specs so cases stay detailed,
searchable, reviewable, and useful for later verification.

`verify` guides quality-gate evidence selection, checks, self-healing, and escalation when the agent
needs confidence that work is correct enough to continue or close.

`review` guides findings-first review of production materials and worktree changes before handoff,
stage transition, or external effect.

`conduct` guides agent behavior before production work or durable project changes, and includes
domain extensions such as coding conduct for implementation, refactoring, and review work.

## Development

```sh
npm install
npm run dev -- --dry-run
npm test
npm run build
```

## Publishing

Publishing is handled by `.github/workflows/publish.yml` when a GitHub Release is published.

Before the first release:

1. Make sure the npm package `harnessize` is owned by your npm user or organization.
2. Configure npm Trusted Publishing for this package:
   - Provider: GitHub Actions
   - Repository: the GitHub repository for this project
   - Workflow: `publish.yml`
3. Ensure `package.json` has the correct public GitHub repository URL before publishing with
   provenance.
4. Publish a GitHub Release whose tag matches the package version, for example `v0.1.0`.

The workflow uses OIDC-based Trusted Publishing instead of a long-lived `NPM_TOKEN`.
