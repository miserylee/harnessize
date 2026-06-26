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
npx harnessize@latest context feature
```

Root routing should distinguish intent and artifact maturity:

1. Do not enter a topic for ordinary Q&A that does not affect production work, project knowledge, or
   later decisions.
2. Use `brainstorm` when the user is exploring, researching, clarifying, discussing, or shaping an
   unclear idea and the discussion is likely to affect project direction, production work, or durable
   knowledge.
3. Use `grill` when the user already has a concrete plan, design, architecture, PRD, or
   implementation approach and wants it challenged before execution.
4. Use `feature` when maintaining feature-level production materials such as feature specs, semantic
   use cases, artifact references, or authoritative feature state.
5. If unsure whether a topic is needed, answer normally first and enter `brainstorm` only when the
   work becomes decision-bearing.
6. Switch to `grill` only after a concrete proposal exists or the user asks for critique.
7. Do not use `grill` for vague questions.

Root context is read-only guidance. It should not itself become the repository's materialized index.
Instead, it should instruct agents to maintain materialized index files inside the user's repository
when documentation domains exist.

Agents should ensure repository documentation has complete indexes, useful summaries for semantic
routing, and traceable retrieval chains from `AGENTS.md` into the relevant documentation domains.
Those index files must be updated when documentation is added, moved, renamed, or materially
changed.

When a repository has docs, a root documentation index such as `docs/README.md` should be the
materialized entrypoint from `AGENTS.md` into documentation domains.

Root context should not prescribe every topic-specific storage layout. Each topic should manage its
own document shapes, while root context provides cross-topic maintenance rules.

## Discussion Record

### Turn 1 - Ordinary Q&A boundary - 2026-06-27 02:01 +08:00

- User signal: The user clarified that ordinary Q&A that does not involve production work does not
  need to enter `brainstorm`.
- Agent work: Root routing was refined so topics are not used for every question. `brainstorm` is
  reserved for decision-bearing discussion, research, clarification, and project knowledge work.
- Sources:
  - `docs/decisions/0003-root-context-guidelines.md`
  - `src/context.ts`
- Decisions: Ordinary Q&A should be answered normally without topic activation.
- Open questions: None.

### Turn 2 - Root indexing responsibility - 2026-06-27 02:22 +08:00

- User signal: The user clarified that document maintenance concerns belong partly to root context:
  indexes must be complete and retrieval chains traceable, but topic-specific document placement
  should be managed by each topic.
- Agent work: Root context responsibility was narrowed to discoverability and routing across
  documentation domains.
- Sources:
  - `docs/decisions/0003-root-context-guidelines.md`
  - `docs/decisions/0005-feature-docs-topic.md`
- Decisions: Root context governs index completeness, summaries, and traceable retrieval chains; it
  does not define every topic's storage layout.
- Open questions: None.

### Turn 3 - Root context is guidance, not an index - 2026-06-27 02:25 +08:00

- User signal: The user clarified that root context is read-only guidance from harnessize, not a
  materialized index in the user repository.
- Agent work: Root documentation responsibility was reframed as guidance for agents to maintain
  actual repository indexes and retrieval chains.
- Sources:
  - `docs/decisions/0003-root-context-guidelines.md`
  - `src/context.ts`
- Decisions: Root context must tell agents to create and update index files in the repository when
  docs are maintained. It should not contain all indexes itself.
- Open questions: None.

### Turn 4 - Dogfood documentation indexes - 2026-06-27 02:42 +08:00

- User signal: The user reported that overall documentation index completeness needed to be checked
  and missing indexes should be filled.
- Agent work: Repository docs were audited. The repository had decision records but no root docs
  index, decision index, feature domain, or feature index, so materialized indexes were added and
  `AGENTS.md` was linked to the docs entrypoint.
- Sources:
  - `AGENTS.md`
  - `docs/README.md`
  - `docs/decisions/README.md`
  - `docs/features/README.md`
  - `src/context.ts`
- Decisions: Use `docs/README.md` as the repository documentation entrypoint and keep domain indexes
  updated when docs change.
- Open questions: None.

### Turn 5 - Strengthen AGENTS docs handoff - 2026-06-27 02:49 +08:00

- User signal: The user pointed out that `AGENTS.md` did not clearly guide agents into the docs
  index.
- Agent work: The repository handoff was made more explicit by adding a `Start Here` section that
  points first to `docs/README.md`, then to root context for workflow guidance.
- Sources:
  - `AGENTS.md`
  - `docs/README.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: `AGENTS.md` should make the local docs index an obvious first-class entrypoint instead
  of burying it after root context.
- Open questions: How the future `init` implementation should merge this docs-index handoff into
  existing user repositories.

### Turn 6 - Audit full index chain - 2026-06-27 02:50 +08:00

- User signal: The user asked whether the current repository index chain was complete.
- Agent work: The chain was checked from `AGENTS.md` to `docs/README.md`, domain indexes, and
  concrete docs. Local Markdown links were mechanically checked. Decision and feature docs were
  fully indexed, but top-level project docs were not reachable from `docs/README.md`, so project
  reference links were added.
- Sources:
  - `AGENTS.md`
  - `docs/README.md`
  - `docs/decisions/README.md`
  - `docs/features/README.md`
  - `README.md`
  - `CHANGELOG.md`
  - `CONTRIBUTING.md`
- Decisions: Treat `docs/README.md` as the complete repository documentation entrypoint, including
  project-level references outside `docs/`.
- Open questions: None.

### Turn 7 - Keep docs index focused - 2026-06-27 02:52 +08:00

- User signal: The user questioned whether project references such as `README.md`, `CHANGELOG.md`,
  and `CONTRIBUTING.md` needed to be included in the docs index.
- Agent work: The index scope was narrowed back to durable documentation domains and production
  materials. The broad project reference section was removed from `docs/README.md`.
- Sources:
  - `docs/README.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: `docs/README.md` should index repository knowledge domains such as decisions and
  feature materials, not every conventional top-level project file.
- Open questions: None.

### Turn 8 - Avoid init-specific index guardrails - 2026-06-27 03:00 +08:00

- User signal: The user clarified that this does not need to be written as an init rule. It is
  enough that init has no default behavior for creating index files.
- Agent work: Init-specific negative wording was removed from root context, init decision material,
  and tests. The remaining root guidance stays positive: agents create and maintain indexes
  progressively when durable documentation domains exist.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `docs/decisions/0001-thin-agent-facing-harness.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: Do not encode documentation indexes as an init concern. Root context should guide
  progressive index maintenance only when documentation domains exist.
- Open questions: None.

## Non-Goals

Do not make the root context a long manual.

Do not load every topic by default.

Do not make the root context responsible for detailed behavior that belongs in focused topics.
