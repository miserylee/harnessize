# Contributing

Thanks for helping build harnessize.

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

## Releases

Releases are published by GitHub Actions when a GitHub Release is published.

1. Update `package.json` version and `CHANGELOG.md`.
2. Merge the release change.
3. Create a GitHub Release whose tag is `v<package.json version>`.
4. The publish workflow validates the tag, builds the package, and publishes to npm.
