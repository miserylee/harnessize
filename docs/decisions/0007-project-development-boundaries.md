# Decision 0007: Project Development Boundaries

Date: 2026-06-27

## Context

Harnessize needs clear project-specific development norms so agent work does not mix repository
dogfood rules, distributed package behavior, decision records, and user-facing runtime guidance.

Recent work exposed boundary mistakes:

- A conduct domain extension was implemented as a separate root topic before the topic shape was
  settled.
- A project-local dogfood rule was at risk of being confused with distributed user guidance.
- Distribution review briefly over-cleaned public project history and open-source metadata.

## Decisions

Project development norms belong primarily in `CONTRIBUTING.md`.

`AGENTS.md` is the agent entrypoint. It should point agents to:

1. `docs/README.md` for local repository knowledge.
2. `CONTRIBUTING.md` for development workflow and boundary rules.
3. `node dist/cli.js context` for dogfood root context guidance.

Distributed package behavior belongs in `src/` and built `dist/`. Rules placed in runtime context
output must be appropriate for user repositories, not only for this repository's internal workflow.

Decision records in `docs/decisions/` preserve reasoning and corrections. They are not themselves
the distributed runtime manual.

Before durable changes, agents must form an explicit plan. The plan should be discussed with the
user when its shape, impact, or risk cannot be safely inferred.

When changing files that ship to npm, review the package surface with:

```sh
npm pack --dry-run --json
```

Distribution review should remove private workspace leakage and accidental internal process notes,
but it must preserve legitimate open-source metadata, public repository links, changelog history,
and accurate dogfood/scaffold status when they help users understand the package.

## Discussion Record

### Turn 1 - Clarify development norms and boundaries - 2026-06-27 03:58 +08:00

- User signal: The user asked to make the current project's development norms explicit and warned
  not to mix boundaries after several previous mistakes.
- Agent work: The project development surface was separated into `CONTRIBUTING.md` for active
  development norms, `AGENTS.md` for agent entrypoint routing, decision records for reasoning, and
  runtime context output for distributed user-facing guidance.
- Sources:
  - `AGENTS.md`
  - `CONTRIBUTING.md`
  - `package.json`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: Put repository development norms in `CONTRIBUTING.md`; keep distributed `conduct`
  focused on user-repository-appropriate behavior; use decision records to preserve corrections and
  boundary decisions.
- Open questions: None.
