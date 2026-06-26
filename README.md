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
```

Options:

- `--dry-run`: preview planned harnessization steps without writing files.
- `--json`: print the plan as JSON.
- `-h, --help`: show help.
- `-v, --version`: show the package version.

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
