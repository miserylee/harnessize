# Decision 0003: Root Context Guidelines

Date: 2026-06-27

## Context

`harnessize context` is the root entrypoint for agent-facing workflow guidance.

The command should not behave as only a topic index. Harnessize context is intended for soft
orchestration of agent workflows: it gives the agent a small set of operating rules, then points the
agent to focused topics only when needed.

## Decisions

The root command:

```sh
npx harnessize@latest context
```

should output harnessize's general agent-facing guidelines.

The root context should explain:

1. Harnessize provides progressive context for agent workflows.
2. The agent should load focused topics only when the user's intent requires them.
3. Repository changes should stay minimal and respect existing conventions.
4. The agent should inspect before broad edits.
5. The agent should ask users only for decisions that cannot be safely inferred or discovered.
6. Durable decisions and material findings should be recorded when the work creates project
   knowledge.
7. Relevant verification should run before implementation work is reported complete.

The available topic list may appear inside the root context, but it is secondary to the workflow
guidelines.

Implemented topics currently include:

```sh
npx harnessize@latest context brainstorm
npx harnessize@latest context grill
```

Root routing should distinguish intent and artifact maturity:

1. Use `brainstorm` when the user is exploring, researching, clarifying, discussing, or shaping an
   unclear idea.
2. Use `grill` when the user already has a concrete plan, design, architecture, PRD, or
   implementation approach and wants it challenged before execution.
3. If unsure, start with `brainstorm`.
4. Switch to `grill` only after a concrete proposal exists or the user asks for critique.
5. Do not use `grill` for vague questions.

## Non-Goals

Do not make the root context a long manual.

Do not load every topic by default.

Do not make the root context responsible for detailed behavior that belongs in focused topics.
