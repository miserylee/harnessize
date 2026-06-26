# Context Topics Feature Spec

Status: Implemented on `main` for the `0.3.1` package line.

## Background And Goals

Harnessize provides a thin npm CLI for preparing repositories for AI harness workflows. The context
topic system lets agents progressively load workflow guidance without injecting a large manual into
the user's repository.

Goals:

- Keep the cold-start prompt short enough for a user to tell their agent to run `npx -y harnessize@latest`
  and follow its guidance.
- Keep generated repository guidance thin and stable.
- Use root context as the stable agent-facing workflow entrypoint.
- Load focused topic guidance only when user intent needs it.
- Dogfood the same documentation and context rules inside this repository.

## References

- [Decision 0001](../decisions/0001-thin-agent-facing-harness.md): Thin agent-facing harness and
  stable `AGENTS.md` handoff.
- [Decision 0002](../decisions/0002-brainstorm-topic.md): `brainstorm` topic behavior and mandatory
  discussion recording.
- [Decision 0003](../decisions/0003-root-context-guidelines.md): Root context routing and
  documentation index maintenance.
- [Decision 0004](../decisions/0004-grill-topic.md): `grill` topic behavior and separation from
  `brainstorm`.
- [Decision 0005](../decisions/0005-feature-docs-topic.md): `feature` topic and feature production
  material governance.
- [Decision 0006](../decisions/0006-agent-behavior-guidelines-topic.md): `conduct` baseline and
  domain behavior guidelines.
- Runtime implementation: `src/context.ts`
- CLI behavior tests: `test/cli.test.ts`
- Repository agent handoff: `AGENTS.md`

## User Stories

- As a repository user, I can ask my agent to run `npx -y harnessize@latest` and get a minimal
  harnessing entrypoint.
- As a repository user, I can ask my agent to run `npx -y harnessize@latest context` and receive root
  workflow guidance without topic-specific noise.
- As an agent, I can choose `brainstorm`, `grill`, `feature`, or `conduct` based on user intent and
  artifact maturity.
- As an agent, I can maintain durable decision records and authoritative feature materials without
  overloading the user with long visible replies.
- As a future maintainer, I can start from `AGENTS.md`, reach `docs/README.md`, and then navigate to
  the relevant decision or feature material.

## Product And Interaction Design

The context interface is command-line Markdown output:

```sh
npx -y harnessize@latest context
npx -y harnessize@latest context brainstorm
npx -y harnessize@latest context grill
npx -y harnessize@latest context feature
npx -y harnessize@latest context conduct
```

The root context provides session rules, the baseline conduct contract, documentation maintenance
rules, topic routing, available topics, and the focused topic command shape. The baseline lives in
root context so agents always receive one authoritative behavior contract before choosing focused
topics. When conversation context compaction removes the root context from short-term memory, agents
should reload the root context before continuing repository work. Root context must explicitly tell
agents to use `npx -y harnessize@latest context` and to include `-y` for npx-based harnessize
invocations.

Focused topics provide deeper agent-facing workflow guidance only after the root context determines
the current user intent needs them.

## Feature Design

- `src/context.ts` owns the topic registry, root context formatting, topic lookup, and topic body
  text.
- `brainstorm` is for analysis, research, discussion, clarification, and ideation that may affect
  project direction or durable knowledge.
- `grill` is for pressure-testing a concrete plan, design, architecture, PRD, or implementation
  approach.
- `feature` is for maintaining feature-level production materials, including feature specs,
  semantic use cases, artifact references, and authoritative feature state.
- `conduct` extends root baseline conduct for production work or durable project changes, with
  domain extensions such as coding conduct inside the same topic. It does not restate the baseline.
- `AGENTS.md` remains thin. It points agents to root context and the repository documentation index,
  not to a hardcoded list of focused topics. It must require root context as session bootstrap and
  tell agents to reload it if conversation compaction removes it from short-term memory.
- Repository documentation indexes are materialized in `docs/README.md` and per-domain index files.

## Functional Breakdown

- Root context:
  - Explain harnessize's progressive context model.
  - Identify `npx -y harnessize@latest context` as the non-interactive root guideline command.
  - Provide the authoritative baseline conduct contract before any focused topic is loaded.
  - Instruct agents to reload root context after conversation compaction when it is no longer in
    short-term memory.
  - Preserve ordinary Q&A outside focused topics when no production or durable knowledge impact
    exists.
  - Route exploration to `brainstorm`, concrete critique to `grill`, and feature production
    material maintenance to `feature`.
  - Route production actions and domain extension needs to `conduct`.
  - Require complete repository documentation indexes with concise summaries and traceable retrieval
    chains.
- Brainstorm topic:
  - Keep visible replies concise and localized.
  - Create a MUST-record obligation when active.
  - Preserve compact turn-level summaries, sources, decisions, open questions, and follow-up items.
- Grill topic:
  - Test one concrete plan risk area at a time.
  - Inspect available context before asking the user.
  - Prefer actionable objections and recommended defaults.
- Feature topic:
  - Create or update `docs/features/<feature-slug>.md` when feature-level production material is
    defined or changed.
  - Keep feature specs authoritative, concise, and free of task execution logs.
  - Maintain `docs/features/README.md` whenever feature specs change.
- Conduct topic:
  - Extend root baseline conduct for production work and domain-specific needs without restating the
    baseline.
  - Identify durable production surfaces, owning files, references, expected behavior changes, and
    likely verification paths.
  - Include domain extensions inside the topic when sharper behavior guidance is needed.
  - Use coding conduct for implementation, refactoring, and review work with emphasis on repository
    fit, restraint, correctness, and clear handoff.

## Semantic Use Cases

- Given a user asks ordinary Q&A with no production or durable knowledge impact
  When the agent reads root context
  Then the agent answers normally without entering a focused topic.

- Given a user is exploring or clarifying an unclear project direction
  When the agent reads root context
  Then the agent enters `brainstorm`, keeps replies concise, and records the discussion flow.

- Given a user has a concrete plan that needs critique
  When the agent reads root context
  Then the agent enters `grill` and pressure-tests one risk area at a time.

- Given work defines or changes feature-level production material
  When the agent reads `context feature`
  Then the agent creates or updates the feature spec and updates the feature index.

- Given an agent starts harnessize-guided repository work
  When the agent reads root context
  Then the agent receives the authoritative baseline conduct before choosing any focused topic.

- Given an agent needs production behavior guidance beyond the root baseline
  When the agent reads `context conduct`
  Then the agent applies production extensions without restating or replacing the root baseline.

- Given an agent is making implementation changes
  When the agent reads `context conduct`
  Then the agent follows the coding domain extension without needing a separate root topic.

- Given an agent is about to make a durable project change
  When the agent reads root context
  Then the agent applies the root baseline and loads `conduct` when production extensions are needed.

- Given a user proposes a solution that may conflict with evidence, constraints, or the user's stated
  goals
  When the agent reads root context
  Then the agent investigates enough context, surfaces contradictions, and asks for clarification,
  redirects, or refuses instead of blindly executing.

- Given an agent resumes after conversation context compaction
  When the root context is no longer available in short-term memory
  Then the agent reloads root context before continuing repository work.

- Given documentation is added, moved, renamed, or materially changed
  When the agent completes the change
  Then the relevant index and retrieval chain are updated.

## Production Artifacts

- npm package: `harnessize`
- GitHub repository: `https://github.com/miserylee/harnessize`
- Public package docs: `README.md`
- Runtime source: `src/context.ts`
- CLI tests: `test/cli.test.ts`
- Repository docs index: `docs/README.md`
- Feature index: `docs/features/README.md`

## Boundaries

This feature spec does not contain task plans, execution logs, todos, or release checklists. Change
reasoning stays in decision records and is referenced from this document when relevant.
