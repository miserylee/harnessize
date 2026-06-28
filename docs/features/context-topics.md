# Context Topics Feature Spec

Status: Implemented on `main` for the post-`0.3.1` package line.

## Background And Goals

Harnessize provides a thin npm CLI for preparing repositories for AI harness workflows. The context
topic system lets agents progressively load workflow guidance without injecting a large manual into
the user's repository.

Goals:

- Keep the cold-start prompt short enough for a user to tell their agent to run
  `npx -y harnessize@latest` and follow its guidance.
- Keep generated repository guidance thin and stable.
- Use root context as the stable agent-facing workflow entrypoint.
- Load focused topic guidance only when user intent needs it.
- Dogfood the same documentation and context rules inside this repository.

## User Stories

- As a repository user, I can ask my agent to run `npx -y harnessize@latest` and get a minimal
  harnessing entrypoint.
- As a repository user, I can ask my agent to run `npx -y harnessize@latest context` and receive root
  workflow guidance without topic-specific noise.
- As an agent, I can choose `brainstorm`, `grill`, `feature`, `caseset`, `verify`, `review`, or `conduct`
  based on user intent and artifact maturity.
- As an agent, I can maintain durable decision records, authoritative feature materials, and
  semantic use cases without overloading the user with long visible replies.
- As an agent, I can use `verify` as a quality gate to choose evidence, run relevant checks, repair
  clear failures, and escalate only when blocked or when authority is unclear.
- As an agent, I can use `review` to assess existing production material or new worktree changes
  before handoff, stage transition, or external effect.
- As a future maintainer, I can start from `AGENTS.md`, reach `docs/README.md`, and then navigate to
  the relevant decision or feature material.

## Product And Interaction Design

The context interface is command-line Markdown output:

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

The root context provides session rules, the baseline conduct contract, documentation maintenance
rules, topic routing, available topics, and the focused topic command shape. The baseline lives in
root context so agents always receive one authoritative behavior contract before choosing focused
topics. When conversation context compaction removes the root context from short-term memory, agents
should reload the root context before continuing repository work. Root context must explicitly tell
agents to use `npx -y harnessize@latest context` and to include `-y` for npx-based harnessize
invocations.

Focused topics provide deeper agent-facing workflow guidance only after the root context determines
the current user intent needs them.

New focused topics should pass a clear admission bar before being added. A topic should have
non-default workflow value, cross-repository portability, clear trigger timing, and low overlap with
existing topics. Candidate guidance that merely restates default agent behavior should be folded into
root, `conduct`, `verify`, or project documentation instead of becoming a standalone topic.

## Feature Design And Functional Breakdown

- `src/context.ts` owns the topic registry, root context formatting, topic lookup, and topic body
  text.
- `brainstorm` is for analysis, research, discussion, clarification, and ideation that may affect
  project direction or durable knowledge.
- `grill` is for pressure-testing a concrete plan, design, architecture, PRD, or implementation
  approach.
- `feature` is for maintaining feature-level production materials, including feature specs, artifact
  references, and authoritative feature state.
- `caseset` is for maintaining semantic use case sets inside feature specs, including case shape,
  grouping, coverage, review, and repair guidance.
- `verify` is for quality-gate evidence selection, check execution, result interpretation,
  self-healing, and escalation when correctness, readiness, safety, or regression confidence needs
  proof.
- `review` is for findings-first review of existing production materials and worktree changes,
  especially before handoff, stage transition, or external effect.
- `conduct` extends root baseline conduct for production work or durable project changes, with
  domain extensions such as coding conduct inside the same topic. It does not restate the baseline.
- Topic admission criteria keep the system small. Add a focused topic only when the candidate:
  - Guides behavior that agents do not already perform reliably by default.
  - Applies across repositories without encoding one technology stack's workflow as universal.
  - Has a clear trigger that agents can recognize from user intent or production state.
  - Does not substantially duplicate root context, `conduct`, `verify`, or another focused topic.
- `AGENTS.md` remains thin. It points agents to root context and the repository documentation index,
  not to a hardcoded list of focused topics. It must require root context as session bootstrap and
  tell agents to reload it if conversation compaction removes it from short-term memory.
- Repository documentation indexes are materialized in `docs/README.md` and per-domain index files.

Functional responsibilities:

- Root context:
  - Explain harnessize's progressive context model.
  - Identify `npx -y harnessize@latest context` as the non-interactive root guideline command.
  - Provide the authoritative baseline conduct contract before any focused topic is loaded.
  - Instruct agents to reload root context after conversation compaction when it is no longer in
    short-term memory.
  - Preserve ordinary Q&A outside focused topics when no production or durable knowledge impact
    exists.
  - Route exploration to `brainstorm`, concrete critique to `grill`, feature production material
    maintenance to `feature`, semantic use case set maintenance to `caseset`, quality-gate work to
    `verify`, findings-first review to `review`, and production actions or domain extension needs to
    `conduct`.
  - Require complete repository documentation indexes with concise summaries and traceable retrieval
    chains.
- Brainstorm topic:
  - Keep visible replies concise and localized.
  - Create a MUST-record obligation when active.
  - Preserve compact turn-level summaries, sources, decisions, open questions, and follow-up items.
  - Choose or create brainstorm records by subject relevance rather than recency.
  - Start a separate record when a discussion introduces a new issue, capability, product question,
    or decision area.
  - Treat the 50-turn split as a length limit for one coherent subject, not as a substitute for
    subject-based record separation.
- Grill topic:
  - Test one concrete plan risk area at a time.
  - Inspect available context before asking the user.
  - Prefer actionable objections and recommended defaults.
- Feature topic:
  - Create or update `docs/features/<feature-slug>.md` when feature-level production material is
    defined or changed.
  - Use a simplified feature spec structure: Background And Goals, User Intent Or User Stories,
    Product And Interaction Design, Feature Design And Functional Breakdown, Semantic Use Cases, and
    References And Artifacts.
  - Keep feature specs authoritative, concise, and free of task execution logs.
  - Maintain `docs/features/README.md` whenever feature specs change.
- Caseset topic:
  - Maintain semantic use cases inside feature specs rather than creating a separate artifact by
    default.
  - Require detailed, searchable case descriptions with preconditions, actions, and assertions.
  - Group cases by scenario or risk area.
  - Encourage coverage of normal flows, boundaries, invalid states, constraints, and regressions.
  - Repair cases when facts or corrected requirements show that an existing case is wrong.
- Verify topic:
  - Identify the claim being verified before choosing checks.
  - Select enough evidence for the current risk, blast radius, and available repository signals.
  - Use semantic use cases as verification inputs without treating them as infallible.
  - Self-heal clear failures and rerun relevant checks.
  - Escalate to humans only when blocked, expected behavior is ambiguous, or authority needs
    confirmation.
  - Avoid durable verification logs by default.
- Review topic:
  - Assess existing production materials or new worktree changes as independent findings-first
    review.
  - Support targeted review of modules, code paths, documents, feature materials, prototypes, demos,
    design materials, release materials, or other production artifacts.
  - Support worktree review by inspecting git status and git diff before push or handoff.
  - Use authoritative materials and `verify` evidence when needed, without creating review artifacts
    by default.
  - Report material findings with `P0`/`P1`/`P2`, evidence, impact, and suggested action.
  - Self-heal only clear, small, low-risk issues with enough authoritative context.
  - Block for P0 findings, major contradictions with authority, or design and architecture impacts
    that need user decision.
- Conduct topic:
  - Extend root baseline conduct for production work and domain-specific needs without restating the
    baseline.
  - Identify durable production surfaces, owning files, references, expected behavior changes, and
    likely verification paths.
  - Include domain extensions inside the topic when sharper behavior guidance is needed.
  - Use coding conduct for implementation, refactoring, and review work with emphasis on repository
    fit, restraint, correctness, and clear handoff.
  - Guide unit-test management inside the coding extension, without treating 100% coverage as a
    default goal.

## Semantic Use Cases

### Topic Routing

- Case: Ordinary question-and-answer work stays outside focused topics when it does not affect
  production work, project knowledge, or later decisions.
  Preconditions: The user asks a lightweight question and no durable repository state or project
  direction is affected.
  Action: The agent reads root context and evaluates topic routing.
  Assertions: The agent answers normally without entering a focused topic.

- Case: Exploratory or unclear project direction enters brainstorm and creates a durable discussion
  record with sources and compact turn summaries.
  Preconditions: The user is analyzing, researching, clarifying, discussing, or shaping an idea that
  may affect project direction or durable knowledge.
  Action: The agent reads root context and then `context brainstorm`.
  Assertions: The agent keeps visible replies concise, records the discussion flow, preserves
  sources, chooses or creates the record by subject relevance, and asks only low-burden decisions.

- Case: A new brainstorm issue creates a separate record instead of being appended to an unrelated
  recent record.
  Preconditions: The current brainstorm discussion introduces a new issue, capability, product
  question, or decision area that does not belong to the active record's coherent subject.
  Action: The agent reads `context brainstorm`, evaluates existing record relevance, and creates or
  chooses the appropriate record.
  Assertions: The new discussion is not appended to an unrelated recent record; indexes and
  cross-links are updated when needed so the retrieval chain stays complete.

- Case: A concrete plan, design, architecture, PRD, or implementation approach is pressure-tested in
  grill instead of being treated as early brainstorm.
  Preconditions: The user provides or asks to test a concrete proposal.
  Action: The agent reads root context and then `context grill`.
  Assertions: The agent pressure-tests one risk area at a time and offers concrete objections,
  recommended defaults, and small decisions.

- Case: Feature-level production material is maintained through feature when current authoritative
  feature state changes.
  Preconditions: Work defines, changes, or relies on feature specs, product behavior, interaction
  design, implementation direction, artifact references, or authoritative feature state.
  Action: The agent reads `context feature`.
  Assertions: The agent creates or updates the relevant feature spec and updates the feature index
  when required.

- Case: Semantic use case set maintenance enters caseset when cases are created, expanded, reviewed,
  or repaired inside a feature spec.
  Preconditions: A feature spec needs semantic use cases, a behavior change affects cases, or
  verification exposes a missing or incorrect expectation.
  Action: The agent reads `context caseset` along with the relevant feature material.
  Assertions: Cases stay inside the feature spec, use detailed semantic descriptions, include
  preconditions, actions, and assertions, and are grouped by scenario or risk area.

- Case: Quality-gate verification enters verify when the agent needs evidence that work is correct
  enough to continue or close.
  Preconditions: A change, implementation, document update, release step, or feature behavior needs
  correctness, readiness, safety, or regression confidence.
  Action: The agent reads `context verify`, identifies the claim, selects relevant evidence, runs
  checks, and self-heals clear failures when practical.
  Assertions: The agent closes only when the quality gate passes, is intentionally narrowed, or the
  remaining risk is explicit; the agent escalates only when blocked or when authority is unclear.

- Case: Targeted review enters review when the user asks for independent assessment of an existing
  production material.
  Preconditions: The user asks to review a module, code path, document, feature material, prototype,
  demo, design material, release material, or another production artifact.
  Action: The agent reads `context review`, gathers relevant authoritative materials, inspects the
  target, and runs verification checks only when needed for evidence.
  Assertions: The agent returns findings-first output, self-heals only clear and low-risk issues
  with enough authoritative context, and blocks for issues requiring user decision.

- Case: Worktree review enters review when repository changes are about to be pushed or handed off.
  Preconditions: The agent has made or is assessing new worktree changes and the material is about to
  be handed off, moved to a new stage, or made externally effective.
  Action: The agent reads `context review`, inspects git status and git diff, gathers relevant
  authoritative materials, and reviews the changed production material.
  Assertions: The agent treats code, feature docs, prototypes, demos, design materials, release
  materials, and other production artifacts as reviewable production material; material findings are
  reported with `P0`/`P1`/`P2`, evidence, impact, and suggested action.

- Case: Durable production work loads conduct when focused topic guidance does not fully cover
  execution behavior.
  Preconditions: The agent is about to change code, docs, tests, design materials, release
  artifacts, or other durable repository state.
  Action: The agent reads `context conduct` after root context and any material-specific focused
  topic.
  Assertions: The agent identifies the durable surface, expected behavior change, likely
  verification path, and production handoff requirements.

- Case: Coding conduct guides unit test management without demanding blanket test coverage.
  Preconditions: The agent is writing, modifying, refactoring, or reviewing implementation code.
  Action: The agent reads `context conduct` and evaluates whether unit tests are useful for the
  changed behavior.
  Assertions: Unit tests are added or updated for low-level, heavily reused, boundary-rich, stable,
  regression-related, or behavior-contract-changing code, using the repository's existing test
  stack and patterns.

- Case: A proposed focused topic is rejected or folded into existing guidance when it only restates
  default agent behavior or overlaps heavily with current topics.
  Preconditions: A candidate topic is proposed for future harnessize guidance.
  Action: The agent evaluates the candidate against topic admission criteria.
  Assertions: The candidate is added only when it has non-default workflow value, cross-repository
  portability, a clear trigger, and low overlap with existing topics; otherwise the guidance is
  folded into root, `conduct`, `verify`, or project documentation.

### Session Bootstrap And Recovery

- Case: Harnessize-guided repository work starts with root context so the agent receives baseline
  conduct before choosing focused topics.
  Preconditions: The agent starts repository work under harnessize guidance.
  Action: The agent reads `npx -y harnessize@latest context`.
  Assertions: The agent receives session rules, baseline conduct, documentation maintenance rules,
  and topic routing before loading focused topics.

- Case: Context compaction recovery reloads root context before continuing repository work.
  Preconditions: Conversation context has been compacted or the agent no longer has root context in
  short-term memory.
  Action: The agent reruns `npx -y harnessize@latest context`.
  Assertions: The agent restores the baseline and topic routing before making further repository
  changes.

- Case: A user-proposed solution is evaluated against evidence, constraints, and project goals
  instead of being blindly executed.
  Preconditions: The user proposes a solution that may be incomplete, inconsistent, or wrong.
  Action: The agent reads root context and investigates enough surrounding context.
  Assertions: The agent surfaces contradictions and asks for clarification, redirects, or refuses
  when evidence, safety, constraints, or the user's stated goals require it.

### Documentation Maintenance

- Case: Documentation index maintenance preserves a traceable retrieval chain when docs change.
  Preconditions: Documentation is added, moved, renamed, removed, or materially changed.
  Action: The agent updates the relevant domain index and checks the retrieval path from
  `AGENTS.md` through `docs/README.md`.
  Assertions: Index summaries stay concise, links remain complete, and future agents can choose the
  right material to read.

## References And Artifacts

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
- [Decision 0008](../decisions/0008-next-topic-candidates.md): `caseset` topic design, semantic use
  case maintenance rules, `verify` topic design, and related unit-test conduct guidance.
- [Decision 0009](../decisions/0009-next-direction-after-core-topics.md): Post-core-topic
  discussion, focused topic admission criteria, and `review` topic design.
- [Decision 0010](../decisions/0010-brainstorm-record-subject-boundaries.md): Brainstorm record
  selection by subject relevance and separate records for new issues.
- npm package: `harnessize`
- GitHub repository: `https://github.com/miserylee/harnessize`
- Public package docs: `README.md`
- Runtime source: `src/context.ts`
- CLI behavior tests: `test/cli.test.ts`
- Repository agent handoff: `AGENTS.md`
- Repository docs index: `docs/README.md`
- Feature index: `docs/features/README.md`

## Boundaries

This feature spec does not contain task plans, execution logs, todos, or release checklists. Change
reasoning stays in decision records and is referenced from this document when relevant.
