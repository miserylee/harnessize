# Decision 0009: Next Direction After Core Topics

Date: 2026-06-28

Status: Implemented: `review` topic landed.

## Context

Harnessize now ships the core progressive context loop: root context, `brainstorm`, `grill`,
`feature`, `caseset`, `verify`, `review`, and `conduct`.

This record captures candidate screening after the first core topics, including rejected
`survey`/`release` standalone topics, topic admission criteria, and the implemented `review` topic.

## Implemented Topic: `review`

Use `review` for findings-first assessment of existing production materials or new worktree changes.
It supports:

- Targeted review of modules, code paths, documents, feature materials, prototypes, demos, design
  materials, release materials, or other production artifacts.
- Worktree review before push or handoff by inspecting git status and git diff.
- Material-specific review gates before handoff, stage transition, or external effect.

`review` does not create durable review artifacts by default. It can use `verify` for evidence, but
its visible output remains findings. Small, clear, low-risk issues may be self-healed when
authoritative context is sufficient. P0 findings, major contradictions with authority, or
design/architecture impacts should block and bring the user into a decision flow such as
`brainstorm`.

Severity uses `P0`/`P1`/`P2`:

- `P0`: blocks the gate and requires a fix or user decision.
- `P1`: should be resolved before handoff and may be self-healed when context is clear.
- `P2`: non-blocking, usually consistency, polish, minor maintainability, documentation, or
  experience detail.

Only user-visible findings need structure. If no material findings remain, the agent can briefly
state that review passed. If small issues were self-healed, it briefly states what changed and what
was checked. Material findings should be reported with severity, evidence, impact, and suggested
action.

## Discussion Record

### Turn 1 - Recommend the next capability area - 2026-06-28 01:00 +08:00

- User signal: After the promotional image fix was accepted and pushed, the user asked what should
  come next.
- Agent work: Existing topic coverage, the context-topics feature spec, decision records, and the
  package scripts were reviewed. The implemented topics cover discussion, critique, feature
  authority, semantic cases, verification, and production conduct. The visible gap is repository
  understanding before production work: how an agent should inspect an unfamiliar repository,
  discover commands and architecture, and maintain retrieval-friendly project knowledge without
  making init generate bulky files.
- Sources:
  - `docs/decisions/0008-next-topic-candidates.md`
  - `docs/features/context-topics.md`
  - `docs/features/README.md`
  - `src/context.ts`
  - `package.json`
- Decisions: None yet.
- Open questions: Whether the next focused topic should be a repository understanding topic, and
  what name best communicates that scope without implying mandatory scaffolded documentation.

### Turn 2 - Challenge repository survey value - 2026-06-28 01:12 +08:00

- User signal: The user challenged the proposed repository survey direction because repository
  exploration is already a default agent capability.
- Agent work: The proposed `survey` direction was re-evaluated. A topic that only teaches agents to
  inspect files, scripts, docs, or architecture would duplicate default agent behavior and existing
  root/conduct guidance. Any value would need to come from boundaries that default exploration often
  lacks: stopping criteria, persistence rules for durable project knowledge, retrieval chain
  maintenance, and when not to create bulky repository references.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
  - `src/context.ts`
- Decisions: Do not treat generic repository exploration as sufficient justification for a new
  focused topic.
- Open questions: Whether repository-understanding guidance should be folded into root/conduct
  instead of becoming a standalone topic, and which next capability has clearer non-default value.

### Turn 3 - Evaluate release topic portability - 2026-06-28 01:16 +08:00

- User signal: The user questioned whether `release` belongs in harnessize because release flows
  differ across technology stacks.
- Agent work: The `release` candidate was reframed as technology-agnostic release governance rather
  than a stack-specific release checklist. The potential value is not prescribing npm, Python,
  Docker, mobile, or cloud commands; it is guiding agents through external irreversible action
  boundaries: discover the repository's own release process, confirm explicit authorization, verify
  version/artifact/change-log/readiness evidence, use dry runs when available, preserve rollback or
  recovery notes, and stop when authority is unclear.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
  - `src/context.ts`
- Decisions: If `release` is pursued, it must not encode a package-manager-specific workflow.
- Open questions: Whether the generic release governance surface is enough to justify a focused
  topic, or whether these rules should be folded into `verify` and `conduct`.

### Turn 4 - Reject standalone release topic for now - 2026-06-28 01:20 +08:00

- User signal: The user concluded that `release` does not look meaningful enough as a standalone
  topic.
- Agent work: The candidate was reassessed against the harnessize topic bar. A focused topic should
  add non-default workflow value and justify progressive disclosure. Since generic release
  governance overlaps heavily with `conduct` and `verify`, and stack-specific release steps are not
  portable enough for harnessize, a standalone `release` topic is not currently justified.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
  - `src/context.ts`
- Decisions: Do not pursue `release` as the next standalone topic for now.
- Open questions: Whether to fold a small external-action authorization rule into `conduct` or
  `verify` later, and what next candidate has clearer independent value.

### Turn 5 - Define topic admission criteria - 2026-06-28 01:22 +08:00

- User signal: The user accepted defining a topic admission bar before adding more focused topics.
- Agent work: The candidate rule was shaped as a design constraint for future root/topic evolution
  rather than an immediate runtime context change. This keeps unproven governance out of distributed
  CLI output while still giving future work a clear filter.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
  - `docs/features/context-topics.md`
  - `node dist/cli.js context feature`
- Decisions: A new focused topic should only be added when it has clear non-default value,
  cross-repository portability, clear trigger timing, and low overlap with existing topics.
- Open questions: Whether this admission bar should later be promoted into root context once it has
  proven useful during topic design.

### Turn 6 - Propose review topic - 2026-06-28 01:29 +08:00

- User signal: The user proposed `review` as a topic that may need to be added.
- Agent work: The candidate was evaluated against the topic admission bar. `review` appears more
  promising than `survey` or `release` because the trigger is clear and default agent behavior is
  often weak here: agents may summarize, praise, or start fixing instead of doing a disciplined
  review. The likely boundary is to review an existing artifact, diff, PR, design, spec, or plan for
  defects and risks; it should not duplicate `grill` for pre-execution pressure testing, `verify`
  for proving the agent's own work, or `conduct` for production execution.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
  - `docs/features/context-topics.md`
  - `src/context.ts`
- Decisions: None yet.
- Open questions: Whether `review` should be scoped to independent assessment of existing artifacts
  and changes, with findings-first output and no edits unless explicitly requested.

### Turn 7 - Define review scenarios and gate behavior - 2026-06-28 01:38 +08:00

- User signal: The user clarified two `review` scenarios: explicit review of an existing module or
  production artifact, and whole-worktree review of new changes as a gate before submitting changes.
  The user also specified that review results should not create artifacts or docs by default,
  findings should be returned to the user, clear small issues may self-heal when authoritative
  context is sufficient, larger contradictions or design/architecture impacts should block and bring
  the user into a decision flow such as `brainstorm`, and review should be a gate at key production
  intent points unless the user explicitly skips it.
- Agent work: The candidate was reframed as a findings-first quality gate for independent
  assessment. It should gather authoritative materials and inspect code or production artifacts in
  module-review mode, or use git diff plus relevant authority in worktree-review mode. `review` may
  invoke `verify` to obtain evidence, but its visible output remains findings rather than a durable
  verification report.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
  - `docs/features/context-topics.md`
  - `src/context.ts`
- Decisions:
  - `review` should support both targeted artifact/module review and whole-worktree change review.
  - Review does not generate artifacts or durable records by default.
  - Small clear issues may be self-healed when authoritative context is sufficient.
  - Large issues, contradictions with authoritative materials, or design/architecture impacts should
    block the flow and involve the user.
  - Review should act as a gate at key production intent points unless explicitly skipped.
- Open questions: Which exact production intent points should automatically trigger review as a
  gate, and how strongly the topic should distinguish review findings from verification evidence.

### Turn 8 - Scope review gates by production material stage - 2026-06-28 01:41 +08:00

- User signal: The user clarified that a default gate before push is sufficient for code/worktree
  changes, but production materials are not limited to code. Feature docs, prototypes, demos, and
  other production artifacts also need review at the key moments of their own production stages.
- Agent work: The gate model was revised away from fixed code lifecycle checkpoints such as commit,
  push, and release. `review` should treat the default worktree gate as push-before-handoff, while
  also supporting material-specific review gates when a user is moving feature docs, prototypes,
  demos, or other production materials across a meaningful stage boundary.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
  - `docs/features/context-topics.md`
- Decisions:
  - For worktree changes, push-before-handoff is the default review gate.
  - Review gate timing should be understood by production material and production stage, not only by
    code lifecycle.
  - Feature docs, prototypes, demos, and other production artifacts can be review targets when they
    are the material being advanced or handed off.
- Open questions: How explicitly the future `review` topic should name common material-specific
  gate examples without turning into a rigid process checklist.

### Turn 9 - Confirm review gate trigger language - 2026-06-28 01:48 +08:00

- User signal: The user accepted framing review triggers around handoff, stage transition, and
  external effect.
- Agent work: The trigger model was settled as a material-agnostic gate language rather than a
  code-specific lifecycle checklist. This keeps `review` applicable to code worktrees, feature docs,
  prototypes, demos, design materials, release materials, and other production artifacts.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions: Future `review` topic design should use `handoff / stage transition / external
effect` as the core gate trigger language.
- Open questions: Review output shape and escalation behavior still need to be finalized.

### Turn 10 - Confirm review findings output direction - 2026-06-28 01:50 +08:00

- User signal: The user accepted using a structured findings output direction for `review`.
- Agent work: The candidate output shape was recorded as a findings-first template with enough
  evidence and actionability for user review without creating durable artifacts by default. Result
  states should distinguish issues that were self-healed, issues that block the flow, and issues
  that need a user decision.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions: `review` findings should include `Finding`, `Severity`, `Evidence`, `Impact`, and
  `Suggested action`, with result states such as `self-healed`, `blocked`, and
  `needs user decision`.
- Open questions: The exact severity scale and the threshold between self-healing, blocking, and
  asking for user decision still need to be finalized.

### Turn 11 - Consider P0/P1/P2 severity labels - 2026-06-28 01:52 +08:00

- User signal: The user asked whether `P0`/`P1`/`P2` labels would be more concise than verbal
  severity names.
- Agent work: The severity naming was re-evaluated. Priority-style labels are concise and familiar
  for review output, but they need explicit definitions so agents do not import inconsistent
  project-specific meanings. A three-level scale appears sufficient if each level maps to gate
  behavior.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions: None yet.
- Open questions: Whether to adopt `P0`/`P1`/`P2` with explicit definitions such as blocking,
  material-before-handoff, and minor/non-blocking.

### Turn 12 - Adopt P0/P1/P2 severity scale - 2026-06-28 01:54 +08:00

- User signal: The user accepted adopting `P0`/`P1`/`P2` severity labels.
- Agent work: The severity scale was settled as concise priority labels with definitions tied to
  review gate behavior. `P0` blocks the gate and requires a fix or user decision; `P1` should be
  resolved before handoff and may be self-healed when context is clear; `P2` is non-blocking and
  covers smaller consistency, maintainability, documentation, or experience issues.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions: Use `P0`/`P1`/`P2` for `review` findings severity.
- Open questions: Finalize self-healing and block thresholds before implementing the topic.

### Turn 13 - Clarify findings, severity, and handling result - 2026-06-28 01:56 +08:00

- User signal: The user challenged whether `severity` and `findings` are actually separate things.
- Agent work: The review output model was corrected. A finding is the individual review issue or
  observation. Severity is a field on each finding, using `P0`/`P1`/`P2`. Handling result is a
  separate field or summary state, such as `self-healed`, `blocked`, `needs user decision`, or
  report-only.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions: Treat severity as a property of each finding, not as a separate output category.
- Open questions: Confirm the final finding item shape before landing the topic.

### Turn 14 - Limit templates to user-visible review reporting - 2026-06-28 01:59 +08:00

- User signal: The user questioned whether a structured finding template is only needed for content
  that must be reported to the user, since `review` itself should not create archived materials.
- Agent work: The output model was simplified. `review` should not require an internal process
  artifact, durable record, or full schema for every checked item. Templates should only shape
  user-visible findings when there is something to report. Internal inspection, verification, and
  small self-healing can stay in the agent's working context.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions: Do not make the findings template a required review artifact. Use it only for
  user-visible reporting of material findings.
- Open questions: Define the minimal user-visible review response shape without over-specifying
  internal review process.

### Turn 15 - Confirm lightweight review reporting - 2026-06-28 02:01 +08:00

- User signal: The user accepted the lightweight review reporting rule and rejected the extra
  `Handling` field.
- Agent work: The user-visible response model was finalized as lightweight reporting. If no issues
  are found, the agent can state that review passed. If small issues were self-healed, the agent
  briefly states what was fixed. If material findings need user attention, the agent reports them
  with `P0`/`P1`/`P2`, evidence, impact, and suggested action. If a large issue blocks the flow, the
  agent should block and bring the user into a decision flow such as `brainstorm`.
- Sources:
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions:
  - Use lightweight review reporting only for user-visible findings.
  - Do not add a separate `Handling` field.
  - Keep internal review inspection, verification, and self-healing out of durable artifacts by
    default.
- Open questions: None for the current reporting model.

### Turn 16 - Land review topic implementation - 2026-06-28 02:05 +08:00

- User signal: The user asked to start landing the `review` topic.
- Agent work: Runtime topic guidance, root routing, CLI tests, public README topic listing, the
  context-topics feature spec, feature index, decision index, and this decision record were updated.
  The implementation keeps `review` focused on findings-first production material review and keeps
  review reports out of durable artifacts by default.
- Sources:
  - `src/context.ts`
  - `test/cli.test.ts`
  - `README.md`
  - `docs/features/context-topics.md`
  - `docs/features/README.md`
  - `docs/decisions/README.md`
  - `docs/decisions/0009-next-direction-after-core-topics.md`
- Decisions:
  - Land `review` as a focused topic.
  - Add root routing for explicit review requests and production material handoff, stage transition,
    or external effect.
  - Add CLI tests that exercise `context review` and root topic listing.
- Open questions: None for this implementation pass.
