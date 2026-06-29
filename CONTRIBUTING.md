# Contributing

Thanks for helping build harnessize.

## Development Boundaries

Keep these surfaces separate:

- Distributed package content: `dist/`, `README.md`, `LICENSE`, `CHANGELOG.md`, and `package.json`.
  These files must be useful and safe for npm users. Public package metadata, public repository
  links, changelog history, and accurate dogfood status are allowed.
- Repository-local agent guidance: `AGENTS.md` and `docs/`. These may include dogfood workflow,
  decision records, local documentation indexes, and project-specific development context.
- Runtime context output: source in `src/context.ts` and built output in `dist/bin.js`. This is
  distributed behavior and must stay agent-facing, general, and user-repository appropriate.

Do not move rules across those boundaries just because they are related. A project development rule
belongs here unless it is intentionally part of the distributed harnessize context.

## Change Workflow

Before making durable changes:

1. Inspect the relevant code, docs, and current git state.
2. Form an explicit implementation plan.
3. Discuss the plan with the user when the shape, impact, or risk cannot be safely inferred.
4. Keep edits scoped to the requested behavior and the owning files.
5. Preserve user changes and unrelated work.

Use this routing for common changes:

- Context topic behavior: update `src/context.ts`, tests, user-facing docs when applicable, the
  context topics feature spec, and the relevant decision record.
- Project development norms: update `CONTRIBUTING.md`, `AGENTS.md` if an agent entrypoint changes,
  and the relevant decision record. Do not place project-only norms in distributed context output.
- Dogfood workflow: update `AGENTS.md` and decision records. Only update distributed docs when the
  information is also public, accurate, and useful to package users.
- Documentation domains: update the affected document and its domain index. Keep `docs/README.md`
  focused on documentation domains, not every conventional project file.

## Distribution Review

When changing files that ship to npm, check the package surface:

```sh
npm pack --dry-run --json
```

Remove private or accidental workspace leakage such as local filesystem paths, personal environment
details, temporary implementation notes, or unplanned internal process. Do not remove legitimate
open-source metadata or useful public project history merely because it names this repository or
describes dogfood/scaffold status.

## Local development

```sh
npm install
npm run build
npm test
```

## Quality checks

Before opening a pull request, run:

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

Use `npm run verify` as the default full check before reporting implementation work as complete.
When `src/` changes, run `npm run build` before relying on the local dogfood CLI in `dist/`.

## Releases

Releases are published by GitHub Actions when a GitHub Release is published.

1. Update `package.json` version and `CHANGELOG.md`.
2. Merge the release change.
3. Create a GitHub Release whose tag is `v<package.json version>`.
4. The publish workflow validates the tag, builds the package, and publishes to npm.
5. After npm publishing completes, smoke test the latest remote package, for example:

   ```sh
   npx -y harnessize@latest context
   npx -y harnessize@latest --version
   ```
