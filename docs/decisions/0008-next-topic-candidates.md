# Decision 0008: Next Topic Candidates

Date: 2026-06-27

Status: Implemented: `caseset`, `verify`, and related unit-test conduct guidance landed.

## Context

Harnessize ships root context plus focused topics for `brainstorm`, `grill`, `feature`, `caseset`,
`verify`, and `conduct`.

This record captures the design and implementation of `caseset` and `verify`, plus the related
unit-test conduct guidance.

## Implemented Topic: `verify`

Use `verify` as a quality gate when the agent needs to prove that a change, implementation, document
update, release step, or feature behavior is correct enough to continue or close.

The topic should answer a focused question:

What evidence is enough for this work?

It should not become a generic testing handbook or a user-reporting ceremony. It should help the
agent choose verification evidence, run the right checks, connect checks to semantic use cases,
self-heal failures when practical, and involve the user only when the agent cannot resolve the
problem or the authority of the expected behavior is unclear.

### Trigger

- Before reporting production work as complete.
- After code, docs, tests, release metadata, or feature materials changed.
- When a user asks whether a change is correct, safe, ready, or covered.
- When feature semantic use cases exist and should be used as regression expectations.
- When verification fails, is flaky, is blocked, or exposes a mismatch between behavior and the
  expected cases.

### Boundary

- Root baseline says verification is required before closing.
- `conduct` identifies likely verification paths for production work.
- `feature` owns semantic use cases and authoritative feature expectations.
- `caseset` should own guidance for maintaining semantic use case sets inside feature docs.
- `verify` owns quality-gate execution: evidence selection, check execution, result interpretation,
  self-healing loop, and human escalation when blocked.

`verify` should not create feature specs, design tasks, or implementation plans. It can cite them as
verification inputs.

`verify` should not create durable verification logs by default. Verification output can stay in the
agent's working context unless another topic requires a documentation update.

### Workflow

1. Identify the claim being verified.
2. Find relevant evidence sources: changed files, feature specs, semantic use cases, tests,
   linters, type checks, configuration, release metadata, logs, or external docs when needed.
3. Treat feature semantic use cases as authoritative verification inputs, but not as infallible.
4. Choose verification depth based on risk, blast radius, available repository checks, and stable
   signal value.
5. Run available checks such as lint, unit tests, type checks, build checks, or project-specific
   scripts when they are relevant.
6. If verification fails, self-heal when the fix is clear and safe, then rerun the relevant checks.
7. If semantic use cases conflict with observed product facts or corrected requirements, update the
   caseset through the appropriate feature/caseset guidance instead of treating the old case as
   absolute truth.
8. Escalate to the user only when the agent cannot resolve the failure, expected behavior is
   ambiguous, or authority needs human confirmation.
9. Close only when the quality gate passes, is intentionally narrowed, or the remaining risk is
   explicit.

### Response Shape

```text
Claim: <what is being verified>
Evidence: <checks, files, semantic use cases, or sources used>
Result: <pass/fail/partial/blocked>
Risk: <remaining uncertainty or skipped coverage>
Next: <only if user action or follow-up is needed>
```

Visible reporting is optional. If the agent can self-heal and continue safely, it should do so
without turning verification into a user-facing ceremony.

## Implemented Topic: `caseset`

Use `caseset` when the agent needs to create, review, or maintain semantic use cases inside a
feature document.

The caseset is not a separate artifact by default. It lives in the feature document's semantic use
case section and provides authoritative process information for `verify`.

### Proposed Scope

- Encourage case design when a solution direction becomes concrete.
- Use human review when case authority materially affects product behavior.
- Update cases when feature behavior changes.
- Repair cases when verification shows that a case conflicts with product facts or corrected
  requirements.
- Make cases detailed enough to cover key paths, edge cases, constraints, invalid states, and known
  bad cases.
- Keep the set structured and maintainable so detail increases authority instead of becoming
  unreadable noise.

### Relation To User Stories

User stories and casesets should both remain in feature documents, but they must not carry the same
level of detail.

- User stories describe user intent, actor, value, and high-level capability.
- Casesets describe concrete, searchable, reviewable behavior expectations used by agents and humans
  for verification.
- Acceptance criteria, boundary behavior, invalid states, and regression expectations should live in
  casesets rather than being duplicated under user stories.
- If a user story starts becoming a detailed scenario matrix, split that detail into the caseset and
  keep the story as concise product intent.

### Relation To Other Feature Spec Sections

Feature specs should avoid duplicated prose by assigning each section one information
responsibility:

- Background and goals explain why the feature exists, what problem it addresses, and any important
  constraints or success direction. They should not restate every user story.
- Research and discussion references preserve traceability to upstream reasoning. They should link
  to brainstorm records, research sources, or related feature materials rather than copying the full
  decision history.
- Product design and interaction design can be combined for simple features. This area should
  describe user-visible behavior, states, flows, and UX decisions.
- Prototype and artifact references should usually be links or short descriptions. They should not
  duplicate the product and interaction design prose unless the artifact itself is unavailable.
- Feature design, implementation direction, and functional breakdown are the most likely to become
  redundant. They can be combined into one section when the feature is small. The section should
  describe the authoritative behavior model, technical direction, module boundaries, and capability
  decomposition, but not task steps or todos.
- Related production artifact references should point to durable outputs such as source files,
  prototypes, package names, release references, generated assets, or external materials. If this
  only repeats the research/reference section, merge them as "References And Artifacts" for that
  feature.
- Semantic use cases should translate the feature understanding into concrete verification
  expectations. They should not carry general design explanation except where context is needed to
  make a case searchable and understandable.

Recommended simplified template for future guidance:

1. Background And Goals.
2. User Intent Or User Stories.
3. Product And Interaction Design.
4. Feature Design And Functional Breakdown.
5. Semantic Use Cases.
6. References And Artifacts.

Sections may be merged when the feature is simple, as long as retrieval and authority stay clear.

### Proposed Case Shape

Cases should be grouped by scenario or risk area inside the feature document so detailed coverage
stays navigable.

The `Case` line should be a detailed semantic description, not a short name. It must be searchable
and understandable without relying on surrounding chat context.

Suggested groups:

- Normal Flow
- Boundary Cases
- Invalid States
- Regression Cases

```text
## Semantic Use Cases

### <Scenario Or Risk Area>

- Case: <detailed semantic description of the behavior, context, and intent>
  Preconditions: <required state or setup>
  Action: <user/system operation>
  Assertions: <observable expectations>
```

## Implemented Conduct Extension: Unit Tests

Unit test guidance belongs in the coding domain extension inside `conduct`, not as a separate topic.

The rule should not demand 100% coverage. It should guide agents to add unit tests for code that is:

- low-level or heavily reused,
- stable enough for tests to protect,
- rich in boundary cases,
- tied to a reported bad case or regression,
- changing a behavior contract.

Unit tests should use the repository's existing technical stack and should not create additional
harnessize artifacts by default.

## Discussion Record

### Turn 1 - Recommend the next topic direction - 2026-06-27 13:15 +08:00

- User signal: The user asked what other topic is worth landing next.
- Agent work: Existing root routing and focused topics were reviewed in `src/context.ts`,
  `docs/features/context-topics.md`, and the decision index. The main gap appears after production
  work: root/conduct say to verify, and `feature` defines semantic use cases, but no focused topic
  guides agents through evidence selection, regression checks, or verification reporting.
- Sources:
  - `src/context.ts`
  - `docs/features/context-topics.md`
  - `docs/decisions/README.md`
  - `docs/decisions/0005-feature-docs-topic.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
- Decisions: None yet.
- Open questions: Whether to discuss a `verify` topic next, or prioritize another gap such as
  repository mapping, release workflow, or implementation execution.

### Turn 2 - Refine `verify` candidate shape - 2026-06-27 13:21 +08:00

- User signal: The user agreed `verify` is a reasonable next direction and asked to refine it.
- Agent work: A candidate `verify` topic shape was drafted with trigger conditions, boundaries,
  workflow, and a compact response template. Existing references to verification in root, `conduct`,
  `feature`, and `grill` were reviewed to keep the candidate from duplicating those topics.
- Sources:
  - `src/context.ts`
  - `docs/features/context-topics.md`
  - `docs/decisions/0005-feature-docs-topic.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions: Treat `verify` as an evidence-selection and residual-risk reporting topic, not as a
  general testing handbook.
- Open questions: Whether `verify` should create any durable verification artifact by default, or
  only report verification results unless another topic requires documentation updates.

### Turn 3 - Reframe verify as quality gate - 2026-06-27 13:36 +08:00

- User signal: The user clarified that `verify` is a quality gate, not primarily a user-facing
  report. Agents should self-heal verification failures when possible and involve humans only when
  blocked. The user also connected `verify` to semantic use cases, unit test guidance, and a future
  `caseset` topic.
- Agent work: The candidate `verify` shape was reframed around quality gates, self-healing,
  semantic-use-case authority with correction paths, repository-native checks, and escalation only
  when the agent cannot resolve ambiguity or failure. A candidate `caseset` topic and related
  conduct coding extension for unit tests were added to the record.
- Sources:
  - `src/context.ts`
  - `docs/features/context-topics.md`
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions:
  - `verify` should use feature semantic use cases as authoritative inputs, but may update them when
    they conflict with facts or corrected requirements.
  - `verify` should run relevant repository-native checks such as lint, type checks, unit tests, and
    build checks according to risk and signal value.
  - Verification should self-heal when possible and escalate to humans only when blocked or when
    authority is unclear.
  - Unit test management belongs in the coding extension of `conduct`.
  - `caseset` should be a separate topic for maintaining semantic use case sets inside feature docs.
- Open questions: Whether to land `verify` first, then `caseset`, or implement both in one release
  because `verify` depends on caseset semantics.

### Turn 4 - Choose caseset before verify - 2026-06-27 13:40 +08:00

- User signal: The user accepted the recommendation to land `caseset` before `verify`.
- Agent work: The dependency order was recorded: first stabilize semantic use case maintenance,
  then build `verify` on top of that authoritative input model.
- Sources:
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions: Design and land `caseset` before `verify`.
- Open questions: Exact `caseset` trigger rules, update obligations, and template wording.

### Turn 5 - Require detailed boundary coverage - 2026-06-27 13:43 +08:00

- User signal: The user accepted the proposed `caseset` triggers and clarified that use case sets
  should be as detailed as practical, covering enough edge cases to be authoritative and valuable.
- Agent work: The `caseset` candidate scope was updated so detailed coverage is a quality goal, not
  something to minimize. The record keeps a maintainability constraint so cases stay structured and
  useful.
- Sources:
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions: `caseset` should encourage rich coverage of key paths, boundary cases, invalid states,
  constraints, and known bad cases while preserving a structured template.
- Open questions: Whether cases should be grouped by scenario/risk area inside the feature document,
  or remain a flat list.

### Turn 6 - Group cases by scenario or risk area - 2026-06-27 13:45 +08:00

- User signal: The user accepted grouping semantic use cases by scenario or risk area.
- Agent work: The `caseset` candidate template was updated to group cases inside the feature
  document's semantic use case section, with suggested groups such as normal flow, boundary cases,
  invalid states, and regression cases.
- Sources:
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions: Cases should be grouped by scenario or risk area rather than maintained as a flat list.
- Open questions: Whether the suggested group names should be required defaults or examples that
  agents can adapt per feature.

### Turn 7 - Make case descriptions semantic and searchable - 2026-06-27 13:47 +08:00

- User signal: The user corrected that `Case` should not be a short name. It needs a detailed
  semantic description so agents can retrieve the case and understand its background.
- Agent work: The `caseset` template was updated so `Case` is a detailed semantic description of
  behavior, context, and intent rather than a short title.
- Sources:
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions: Case descriptions must be searchable and understandable without relying on surrounding
  chat context.
- Open questions: None.

### Turn 8 - Separate user stories from casesets - 2026-06-27 13:51 +08:00

- User signal: The user asked whether feature document sections may become redundant, specifically
  whether user stories and casesets duplicate each other.
- Agent work: The current `feature` topic shape and feature spec structure were reviewed. The
  candidate `caseset` guidance was updated to make user stories high-level intent/value material and
  casesets concrete verification expectations.
- Sources:
  - `node dist/cli.js context feature`
  - `docs/features/context-topics.md`
  - `docs/decisions/0005-feature-docs-topic.md`
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions: Keep both sections, but move detailed acceptance criteria, boundaries, invalid states,
  and regression expectations into casesets. User stories should stay concise and value-oriented.
- Open questions: Whether future `feature` topic guidance should rename or narrow "User Stories" to
  make this boundary more obvious.

### Turn 9 - Review feature spec section redundancy - 2026-06-27 13:58 +08:00

- User signal: The user asked to review other possible redundancies in the feature document
  structure beyond user stories and casesets.
- Agent work: The current local `feature` context, the dogfooded context-topics feature spec, and
  the original feature topic decision were reviewed. The main overlap risk is not a single bad
  section, but unclear responsibility between product design, interaction design, prototypes,
  implementation direction, functional breakdown, references, and artifacts.
- Sources:
  - `node dist/cli.js context`
  - `node dist/cli.js context brainstorm`
  - `node dist/cli.js context feature`
  - `docs/decisions/0005-feature-docs-topic.md`
  - `docs/features/context-topics.md`
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions: None yet.
- Open questions: Whether to update future `feature` and `caseset` guidance toward a simplified
  six-section feature spec template with mergeable sections for small features.

### Turn 10 - Land caseset with feature template cleanup - 2026-06-27 14:04 +08:00

- User signal: The user confirmed that `caseset` should be landed together with the simplified
  `feature` spec template.
- Agent work: Runtime topic guidance, CLI tests, public README topic listing, the context-topics
  feature spec, feature index, and this decision record were updated. The implementation keeps
  `verify` out of scope for this change while making `caseset` available as a focused topic.
- Sources:
  - `node dist/cli.js context`
  - `node dist/cli.js context brainstorm`
  - `node dist/cli.js context feature`
  - `node dist/cli.js context conduct`
  - `src/context.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `docs/features/context-topics.md`
  - `docs/features/README.md`
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions:
  - Land `caseset` as a focused topic for semantic use case maintenance inside feature specs.
  - Update `feature` guidance to the simplified six-section feature spec template.
  - Keep `verify` as the next candidate instead of implementing it in this change.
- Open questions: Whether `verify` should be landed after `caseset`, and whether conduct should add
  the unit-test management extension during the same future change.

### Turn 11 - Land verify and unit-test conduct guidance - 2026-06-27 14:11 +08:00

- User signal: The user said to continue after `caseset` and feature template cleanup landed.
- Agent work: The remaining candidate work was implemented: `verify` became a focused topic for
  quality-gate evidence selection, checks, self-healing, and escalation; root routing and public
  README topic lists were updated; `conduct` received the related unit-test management guidance; the
  context-topics feature spec and indexes were updated.
- Sources:
  - `node dist/cli.js context`
  - `node dist/cli.js context conduct`
  - `node dist/cli.js context feature`
  - `node dist/cli.js context caseset`
  - `src/context.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `docs/features/context-topics.md`
  - `docs/features/README.md`
  - `docs/decisions/0006-agent-behavior-guidelines-topic.md`
  - `docs/decisions/0008-next-topic-candidates.md`
- Decisions:
  - Land `verify` as a focused topic after `caseset`.
  - Keep verification as a quality gate, not a generic testing handbook or mandatory user-facing
    report.
  - Let `verify` use semantic use cases as authoritative inputs while delegating use-case repair to
    `caseset`.
  - Put unit-test management guidance inside the coding extension of `conduct`.
- Open questions: None for this implementation pass.
