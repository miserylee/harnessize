# Decision 0005: Feature Topic

Date: 2026-06-27

## Context

Harnessize needs a topic for feature lifecycle design and production material governance.

This topic is distinct from `brainstorm` and `grill`. `brainstorm` records the decision process and
discussion flow. `grill` pressure-tests a concrete proposal. The feature topic helps agents manage
feature-level production materials across design, iteration, implementation reference, review, and
regression support.

Feature specs are one class of production material owned by this topic.

General documentation maintenance rules belong in root context. This topic owns the feature
lifecycle domain and its feature-specific material shapes.

## Decisions

The topic name should be:

```sh
npx harnessize@latest context feature
```

The feature topic should treat feature production materials as authoritative sources, not as task
plans.

Feature specs should contain:

1. Background, goals, and references to relevant research and discussion records.
2. User stories, product design, interaction design, and prototype references.
3. Feature design, implementation direction, and functional breakdown used as authoritative
   implementation reference.
4. Semantic use cases written in a fixed, concise template for human review and agent regression
   self-checks.
5. Related production artifact information.

Feature specs should continue to participate in future iterations. When the product changes, the
authoritative feature doc should be updated.

The decision process behind a change should stay in `brainstorm` records. Feature docs should carry
the current authoritative state and cite the relevant discussion records instead of absorbing the
full decision history.

Feature specs are not plans. They should not contain task breakdowns, task execution records, todos,
or step-by-step work logs.

Agents may use feature specs plus repository exploration to determine actual implementation state and
remaining work.

Entering `feature` creates a MUST-maintain obligation when the work defines, changes, or relies on
feature-level production material. If no feature spec exists for the feature, the agent should create
one before claiming the feature state is captured, or explicitly state why writing is blocked.

Feature specs should use one concise document per feature by default:

```text
docs/features/<feature-slug>.md
```

A feature should normally not need many files. Artifact information should usually be references
inside the feature spec rather than raw artifact content or a separate artifact document.

The feature topic owns feature-specific material layout. Root context provides global index and
retrieval-chain maintenance guidance, not every topic's storage shape.

The feature domain should maintain an index at `docs/features/README.md` and update it when feature
specs are added, moved, renamed, removed, or materially changed.

## Discussion Record

### Turn 1 - Define feature docs purpose - 2026-06-27 02:18 +08:00

- User signal: The user proposed `feature-docs` as a topic for authoritative production
  documentation generated at the right moment during project work.
- Agent work: The proposal was captured as a distinct documentation domain: feature docs preserve
  authoritative current-state production material, while `brainstorm` preserves change reasoning and
  decision flow.
- Sources:
  - Conversation with the user.
  - `docs/decisions/0001-thin-agent-facing-harness.md`
  - `docs/decisions/0002-brainstorm-topic.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: Feature docs should be authoritative production references, not task plans or raw
  discussion logs.
- Open questions:
  - What fixed template should semantic use cases follow?
  - Should the topic command be named `feature-docs`, `feature-doc`, or something else?

### Turn 2 - Feature doc storage shape - 2026-06-27 02:22 +08:00

- User signal: The user clarified that a feature slug as a single feature document is enough,
  because a normal feature should not need too much content and artifact information is mostly
  references.
- Agent work: The storage shape was simplified from a per-feature directory to one file per feature.
- Sources:
  - `docs/decisions/0005-feature-docs-topic.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: Use `docs/features/<feature-slug>.md` as the default feature doc location. Keep
  artifact references inside the feature doc unless a future topic-specific reason requires more.
- Open questions:
  - What fixed template should semantic use cases follow?
  - Should the topic command be named `feature-docs`, `feature-doc`, or something else?

### Turn 3 - Documentation management naming - 2026-06-27 02:29 +08:00

- User signal: The user clarified that this topic is essentially document management, not a work
  mode that decides how work proceeds.
- Agent work: The naming direction shifted away from `feature-spec` and toward a documentation
  management term.
- Sources:
  - `docs/decisions/0005-feature-docs-topic.md`
- Decisions: The topic name should communicate document maintenance rather than feature planning or
  specification work.
- Open questions: Final topic name.

### Turn 4 - Keep topic feature-scoped - 2026-06-27 02:30 +08:00

- User signal: The user clarified that this topic is still focused on feature-related documents.
  General documentation maintenance rules belong in root context.
- Agent work: The topic scope was corrected from broad document management to feature documentation
  management.
- Sources:
  - `docs/decisions/0005-feature-docs-topic.md`
  - `docs/decisions/0003-root-context-guidelines.md`
- Decisions: Root context owns global documentation maintenance guidance. This topic owns the
  feature documentation domain.
- Open questions: Final topic name.

### Turn 5 - Consider `feature` topic name - 2026-06-27 02:34 +08:00

- User signal: The user asked whether the topic could simply be named `feature`.
- Agent work: The name was evaluated against current topic scope. `feature` is concise, but too
  broad for a flat topic namespace because it can imply the whole feature lifecycle, including
  design, planning, implementation, and validation. The current topic is narrower: maintaining
  authoritative feature documentation.
- Sources:
  - `docs/decisions/0005-feature-docs-topic.md`
- Decisions: Prefer not to use `feature` unless the topic expands to cover the full feature
  lifecycle.
- Open questions: Final topic name.

### Turn 6 - Expand to feature lifecycle - 2026-06-27 02:35 +08:00

- User signal: The user suggested that the topic can cover the full feature lifecycle, with
  `feature-spec` as only one class of production material.
- Agent work: The topic scope was expanded from feature documentation management to feature
  lifecycle design and production material governance.
- Sources:
  - `docs/decisions/0005-feature-docs-topic.md`
- Decisions: Use `feature` as the topic name. Treat feature specs as one authoritative material type
  inside the broader feature topic.
- Open questions:
  - What fixed template should semantic use cases follow?
  - What other feature lifecycle artifacts should the topic explicitly manage beyond feature specs?

### Turn 7 - Dogfood feature spec maintenance - 2026-06-27 02:42 +08:00

- User signal: The user reported that `feature-spec` had not been dogfooded and that the current
  trigger mechanism did not correctly guide agents to persist feature documentation.
- Agent work: The feature topic guidance was tightened with a MUST-maintain obligation, the feature
  docs index was added, and `docs/features/context-topics.md` was created as the first dogfooded
  feature spec.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `docs/features/README.md`
  - `docs/features/context-topics.md`
  - `docs/decisions/0005-feature-docs-topic.md`
- Decisions: Entering `feature` requires creating or updating the relevant feature spec when the
  work changes feature-level production material, and the feature index must stay current.
- Open questions: None.
