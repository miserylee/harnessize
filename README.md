# harnessize

`harnessize` is a CLI for preparing repositories for AI harness workflows.

```sh
npx harnessize
```

The repository is currently in its initial scaffold phase. The CLI already exposes the command
shape, option parsing, build pipeline, tests, and release automation; the concrete repository
harnessing behavior will be added next.

## Usage

```sh
npx harnessize [target] [options]
npx harnessize context [topic]
```

Options:

- `--dry-run`: preview planned harnessization steps without writing files.
- `--json`: print the plan as JSON.
- `-h, --help`: show help.
- `-v, --version`: show the package version.

## Context Topics

Harnessize can provide progressive, agent-facing guidance without copying large manuals into the
target repository.

```sh
npx harnessize@latest context
npx harnessize@latest context brainstorm
npx harnessize@latest context grill
npx harnessize@latest context feature
npx harnessize@latest context conduct
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

`conduct` guides baseline agent behavior across work types. The first version is baseline-only;
domain-specific behavior extensions can be added later.

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
