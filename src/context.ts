export interface ContextTopic {
  body: string;
  name: string;
  summary: string;
}

export interface ContextTopicSummary {
  name: string;
  summary: string;
}

export class UnknownContextTopicError extends Error {
  constructor(topic: string) {
    super(`Unknown context topic: ${topic}`);
    this.name = 'UnknownContextTopicError';
  }
}

const brainstormTopic: ContextTopic = {
  name: 'brainstorm',
  summary: 'Guide analysis, research, discussion, clarification, and ideation work.',
  body: `# harnessize context: brainstorm

Use this topic when the user wants analysis, research, discussion, clarification, or ideation.

## Purpose

Reduce the user's cognitive load while moving ambiguous work toward clear decisions.

## Operating Rules

- Keep responses concise, rigorous, and low-volume.
- Default to 3-6 short lines plus the localized template unless the user asks for more detail.
- Focus each turn on one key point or one tightly scoped decision area.
- Do reasonable background work before asking the user to decide.
- Ask only for information that cannot be safely inferred or discovered.
- Keep each human decision small enough to answer quickly.
- Move supporting detail into the durable record when it matters later instead of overloading the visible reply.
- If the user briefly interrupts with unrelated work, handle it and return to the brainstorm thread unless they clearly exit or redirect.

## Recording Rules

- Entering \`brainstorm\` creates a MUST-record obligation.
- Maintain a durable record of the discussion flow while the topic is active: compact turn-level summaries, user intent and constraints, agent research and reasoning, sources, decisions, material research findings, assumptions, open questions, rejected alternatives, and follow-up items.
- If no durable record location exists yet, create or choose one before continuing the brainstorm, or explicitly tell the user that recording is blocked.
- Record research findings when they influence topic selection, product direction, implementation strategy, risk assessment, or a later decision.
- Preserve information sources. For web research, include the title or source name and URL. For repository research, include the file path. For knowledge-base or tool research, include the retrievable resource identifier when available.
- Include enough source or context information for a future agent to understand why the finding mattered.
- Do not copy the raw chat transcript into project knowledge.
- Include explicit date and time in records.
- Use concise numeric timezone offsets, for example: 2026-06-27 00:12 +08:00.
- Records are not only final conclusions. Preserve compact per-turn summaries of important question-and-answer flow so future agents can understand how decisions were reached.
- Split long-running brainstorm records after 50 discussion turns.
- When splitting, preserve chronology and link the previous and next files.
- When exiting the topic, decide whether durable conclusions should be promoted into a long-lived document or knowledge base.
- If an investigation materially changes the discussion, update the working record near that point instead of waiting until topic exit.

## Record Shape

\`\`\`text
## Turn <n> - <focus> - <YYYY-MM-DD HH:mm +08:00>

- User signal: <key user intent, constraint, correction, or answer>
- Agent work: <important investigation, reasoning, or synthesis>
- Sources: <URLs, file paths, resource ids, or "none">
- Decisions: <settled decisions, if any>
- Open questions: <remaining uncertainty, if any>
\`\`\`

## Response Template

Localize labels and prose to the user's current language context.

Default shape:

\`\`\`text
Focus: <one current decision area>
Settled: <what is already decided, if anything>
Need from you: <one low-burden decision or clarification>
\`\`\`

Use the record field only when there was an actual write, a record location changed, a log split occurred, content was promoted into long-lived knowledge, or recording failed:

\`\`\`text
Record: <only when relevant, include location and timestamp when applicable>
\`\`\`

## Exit Behavior

When the brainstorm thread ends, summarize only the durable conclusions. If useful, write or update the appropriate project record. Avoid turning the repository into a transcript archive.
`,
};

const grillTopic: ContextTopic = {
  name: 'grill',
  summary: 'Pressure-test a concrete plan, design, architecture, PRD, or implementation approach.',
  body: `# harnessize context: grill

Use this topic when the user already has a concrete plan, design, architecture, PRD, or implementation approach and wants it challenged before execution.

Do not use this topic just because the user asks a vague question. Grill needs an object to test. If the idea is still ambiguous, use \`brainstorm\` first.

## Purpose

Find weak assumptions, missing constraints, unclear tradeoffs, and risky execution gaps before work starts.

## Operating Rules

- Pressure-test the plan without turning the interaction into a hostile interrogation.
- Keep each turn focused on one risk area or one decision area.
- Inspect available repository context before asking the user for information.
- Ask only questions that materially change the plan, scope, risk, or implementation path.
- Prefer concrete objections over abstract skepticism.
- When possible, provide a recommended answer or default path so the user can respond quickly.
- Stop grilling when the remaining questions no longer change the likely plan.

## What To Test

- Goal: what outcome is this plan supposed to produce?
- User value: who benefits, and what changes for them?
- Scope: what is explicitly in and out?
- Constraints: what technical, product, time, compatibility, or release constraints matter?
- Risks: what could fail, regress, confuse users, or increase maintenance cost?
- Alternatives: what simpler or safer approach was rejected, and why?
- Verification: how will success and correctness be checked?
- Rollback: what happens if the plan is wrong?

## Response Template

Localize labels and prose to the user's current language context.

Default shape:

\`\`\`text
Focus: <one plan area being pressure-tested>
Risk: <the concrete risk, gap, or assumption>
Recommended path: <the agent's current best default, if clear>
Need from you: <one low-burden decision or clarification>
\`\`\`

Use the record field only when there was an actual write, a record location changed, content was promoted into long-lived knowledge, or recording failed:

\`\`\`text
Record: <only when relevant, include location and timestamp when applicable>
\`\`\`

## Exit Behavior

When the pressure test ends, summarize the strongest surviving plan, the main risks accepted, and the verification or rollback expectations. Record durable decisions when the discussion creates project knowledge.
`,
};

const featureTopic: ContextTopic = {
  name: 'feature',
  summary: 'Guide feature lifecycle design and authoritative feature production materials.',
  body: `# harnessize context: feature

Use this topic when work needs feature-level production materials: feature specs, user intent, product/interaction references, prototype references, artifact references, or updates to authoritative feature state.

Do not use this topic as a task plan. Feature materials describe the current authoritative feature understanding; task planning and execution records belong elsewhere.

## Purpose

Keep feature-level production materials complete, current, reviewable, and useful as implementation and regression references for humans and agents.

## Operating Rules

- Treat feature materials as authoritative sources for the current feature state.
- Entering \`feature\` creates a MUST-maintain obligation when the work defines, changes, or relies on feature-level production material.
- If no feature spec exists for the feature, create one at \`docs/features/<feature-slug>.md\` before claiming the feature state is captured, or explicitly state why writing is blocked.
- Keep feature specs concise enough to stay maintainable.
- Keep decision process and change reasoning in \`brainstorm\` records; cite them from feature materials when relevant.
- Update feature materials when background, user intent, product behavior, interactions, semantic use cases, artifact references, or implementation direction materially change.
- Update \`docs/features/README.md\` when feature specs are added, moved, renamed, removed, or materially changed.
- Use repository exploration plus feature materials to understand actual implementation state.
- Preserve root documentation rules: indexes MUST include summaries and MUST be updated when docs change.

## Feature Spec

Use one concise document per feature by default:

\`\`\`text
docs/features/<feature-slug>.md
\`\`\`

A feature spec should usually include these information responsibilities:

- Background And Goals: why the feature exists, the problem it addresses, and important constraints.
- User Intent Or User Stories: actor, intent, value, and high-level capability.
- Product And Interaction Design: user-visible behavior, states, flows, and UX decisions.
- Feature Design And Functional Breakdown: authoritative behavior model, technical direction, module boundaries, and capability decomposition.
- Semantic Use Cases: concrete behavior expectations for human review and agent self-check regression.
- References And Artifacts: research records, discussion records, prototypes, source references, release references, generated assets, or external materials.

Sections may be merged when the feature is simple, as long as retrieval and authority stay clear.

## Semantic Use Cases

Semantic use cases belong in the feature spec. Use \`caseset\` when creating, reviewing, expanding, or repairing the semantic use case section.

## Boundaries

Feature specs should not contain task breakdowns, execution logs, todos, or step-by-step work records.

When a feature changes, update the feature spec to the new authoritative state. Keep the change decision trail in \`brainstorm\` and link to it when useful.
`,
};

const casesetTopic: ContextTopic = {
  name: 'caseset',
  summary: 'Guide semantic use case set maintenance inside feature specs.',
  body: `# harnessize context: caseset

Use this topic when the agent needs to create, review, expand, or repair semantic use cases inside a feature spec.

Do not create a separate caseset artifact by default. Cases live in the feature spec's semantic use case section.

## Purpose

Make feature behavior concrete, searchable, reviewable, and useful as verification input for humans and agents.

## Operating Rules

- Load \`feature\` when touching the surrounding feature spec. \`caseset\` owns the use case maintenance method, not the whole feature document.
- Design or update cases when a solution direction becomes concrete, feature behavior changes, or verification exposes a missing or incorrect expectation.
- Treat existing cases as authoritative verification inputs, but not as infallible. Repair them when product facts or corrected requirements show that a case is wrong.
- Ask for human review when cases define product authority, change expected behavior, or expose ambiguity that cannot be safely inferred.
- Make each case detailed enough to be searchable and understandable without surrounding chat context.
- Cover normal flows, boundary cases, invalid states, constraints, and known bad cases or regressions when they matter.
- Group cases by scenario or risk area so detailed coverage stays navigable.
- Keep cases focused on expected behavior. Do not duplicate broad product design prose or record verification run logs in the caseset.

## Case Shape

Use this shape inside the feature spec:

\`\`\`text
## Semantic Use Cases

### <Scenario Or Risk Area>

- Case: <detailed semantic description of the behavior, context, and intent>
  Preconditions: <required state or setup>
  Action: <user/system operation>
  Assertions: <observable expectations>
\`\`\`

The \`Case\` line is not a short name. It should describe enough semantic context for later agents to retrieve and understand the expected behavior.

## Boundaries

- \`feature\` owns the authoritative feature document as a whole.
- \`caseset\` owns semantic use case set shape, coverage, and repair guidance.
- Future verification guidance may use cases as quality-gate input, but verification execution belongs outside this topic.

## Response Template

Localize labels and prose to the user's current language context.

\`\`\`text
Focus: <one scenario or risk area>
Cases: <added, changed, reviewed, or repaired cases>
Authority: <human-reviewed, inferred from feature material, or needs confirmation>
Need from you: <only when product authority or ambiguity needs a human decision>
\`\`\`
`,
};

const verifyTopic: ContextTopic = {
  name: 'verify',
  summary: 'Guide quality-gate evidence selection, checks, self-healing, and escalation.',
  body: `# harnessize context: verify

Use this topic when the agent needs to prove that a change, implementation, document update, release step, or feature behavior is correct enough to continue or close.

Do not use this topic as a generic testing handbook or a user-facing reporting ceremony. Verification is a quality gate.

## Purpose

Choose enough evidence for the current claim, run the right checks, self-heal failures when practical, and involve the user only when the agent cannot resolve the problem or expected behavior needs human authority.

## Operating Rules

- Identify the claim being verified before choosing checks.
- Find relevant evidence sources: changed files, feature specs, semantic use cases, tests, linters, type checks, builds, release metadata, logs, or external docs when needed.
- Treat feature semantic use cases as authoritative verification inputs, but not as infallible.
- Use \`caseset\` to repair semantic use cases when observed facts or corrected requirements show that a case is wrong.
- Choose verification depth based on risk, blast radius, available repository checks, and stable signal value.
- Prefer repository-native checks such as lint, type checks, unit tests, build checks, or project-specific scripts when they are relevant.
- If verification fails, self-heal when the fix is clear and safe, then rerun the relevant checks.
- Escalate to the user only when the agent cannot resolve the failure, expected behavior is ambiguous, or authority needs human confirmation.
- Close only when the quality gate passes, is intentionally narrowed, or the remaining risk is explicit.

## Evidence Selection

Use the smallest evidence set that can honestly support the claim:

- Documentation-only changes usually need formatting, link/index checks, and consistency checks against related docs.
- Code behavior changes usually need targeted tests plus any lint, type, build, or regression checks that protect the touched path.
- Feature behavior changes should check relevant semantic use cases and update them when the expected behavior changes.
- Release or package changes should check metadata, build output, package files, and release automation assumptions.

## Boundaries

- \`feature\` owns authoritative feature material.
- \`caseset\` owns semantic use case maintenance.
- \`conduct\` owns production and domain behavior guidance.
- \`verify\` owns quality-gate execution: evidence selection, check execution, result interpretation, self-healing, and human escalation when blocked.

Do not create durable verification logs by default. Keep verification output in the agent's working context unless another topic requires a documentation update.

## Response Template

Localize labels and prose to the user's current language context. Visible reporting is optional when the agent can self-heal and continue safely.

\`\`\`text
Claim: <what is being verified>
Evidence: <checks, files, semantic use cases, or sources used>
Result: <pass, fail, partial, or blocked>
Risk: <remaining uncertainty or skipped coverage>
Next: <only if user action or follow-up is needed>
\`\`\`
`,
};

const conductTopic: ContextTopic = {
  name: 'conduct',
  summary: 'Extend root baseline conduct for production work, durable changes, and domains.',
  body: `# harnessize context: conduct

Use this topic when the agent is about to perform production work such as code changes, documentation changes, tests, design work, refactoring, review, release work, or other durable project changes.

Also use this topic when another topic defines the material type but not enough production or domain guidance. For example, use \`feature\` for authoritative feature materials and \`conduct\` for production execution guidance.

Do not use this topic for ordinary Q&A, lightweight explanation, or replies that do not affect production work, project knowledge, or durable state.

## Purpose

Extend root baseline conduct for production work, durable changes, and domain-specific execution.

## Root Baseline Dependency

Read \`npx -y harnessize@latest context\` first. This topic assumes the root baseline conduct is already active.

Do not treat this topic as a standalone replacement for root context. It adds production and domain guidance on top of the root baseline.

## Production Extension

- Identify the durable surface being changed: code, docs, tests, design materials, release artifacts, or repository state.
- Load any focused topic that owns the material type, such as \`feature\` for authoritative feature materials.
- Before editing, identify the owning files, relevant references, expected behavior change, and likely verification path.
- Keep production handoff tied to behavior, verification, residual risk, and any unresolved user decision.

## Extension Boundary

Baseline conduct lives in root context. This topic only adds production and domain-specific guidance.

Do not copy behavior systems wholesale into harnessize. Absorb useful ideas into compact rules that match this project and the user's context.

## Domain Extension: Coding

Use this extension when the agent is writing, modifying, refactoring, or reviewing implementation code. It extends root baseline conduct; it does not replace project instructions, feature specs, or focused implementation context.

Coding loop:

1. Read the relevant call path, tests, configuration, and local conventions.
2. Choose the smallest sufficient code change that fits existing patterns.
3. Reuse local helpers, platform features, and existing dependencies before adding new machinery.
4. Implement narrowly without opportunistic refactors.
5. Run relevant checks or clearly state what remains unverified.
6. Report the changed behavior, verification, and residual risk concisely.

Repository fit:

- Follow the repository's existing architecture, naming, error handling, formatting, and test style.
- Prefer changing the code path that actually owns the behavior over adding side channels or parallel abstractions.
- Keep public contracts stable unless the requested change explicitly requires a contract change.

Restraint:

- Add an abstraction only when it removes real complexity, reduces meaningful duplication, or matches an established local pattern.
- Add a dependency only when existing project tools or platform APIs are not a reasonable fit and the benefit is clear.
- Avoid speculative generality, unused extension points, and "while here" rewrites.

Correctness:

- For bug fixes, identify the failing behavior before changing code when practical.
- Update tests, fixtures, docs, or types when the behavior contract changes.
- Scale verification to risk: focused checks for narrow edits, broader regression checks for shared behavior or user-facing workflows.

Unit tests:

- Do not pursue 100% coverage as a goal by default.
- Add or update unit tests when code is low-level or heavily reused, stable enough for tests to protect, rich in boundary cases, tied to a reported bad case or regression, or changing a behavior contract.
- Use the repository's existing test stack and patterns.
- Do not create harnessize-specific unit test artifacts unless the project explicitly needs them.

Handoff:

- Summarize the implementation result in terms of behavior, not just files changed.
- Mention skipped verification, known uncertainty, or compatibility risk directly.
`,
};

const topics = [
  brainstormTopic,
  grillTopic,
  featureTopic,
  casesetTopic,
  verifyTopic,
  conductTopic,
] as const;

export function listContextTopics(): ContextTopicSummary[] {
  return topics.map((topic) => ({
    name: topic.name,
    summary: topic.summary,
  }));
}

export function getContextTopic(topicName: string): ContextTopic {
  const topic = topics.find((candidate) => candidate.name === topicName);

  if (!topic) {
    throw new UnknownContextTopicError(topicName);
  }

  return topic;
}

export function formatRootContext(): string {
  const lines = [
    '# harnessize context',
    '',
    'Harnessize provides agent-facing workflow guidance through progressive context topics.',
    '',
    'Use `npx -y harnessize@latest context` as the root guideline for soft-orchestrating agent work. Load focused topics only when the current user intent needs them.',
    '',
    'When invoking harnessize through npx, include `-y` so package execution does not stop for manual confirmation.',
    '',
    '## Session Rules',
    '',
    '- Treat this root context as required session bootstrap for harnessize-guided repository work.',
    '- If this root context is no longer available in short-term memory after conversation compaction, rerun `npx -y harnessize@latest context` before continuing repository work.',
    '- Load focused topics only when the current user intent needs them.',
    '- Prefer focused topic context over large, all-purpose instruction dumps.',
    '',
    '## Baseline Conduct',
    '',
    'Application loop:',
    '',
    '1. Inspect enough context to avoid guessing.',
    "2. Evaluate the user's request and proposed approach against evidence, constraints, and project goals.",
    '3. Form an explicit plan before changing durable state.',
    '4. Confirm the plan with the user when shape, impact, or risk cannot be safely inferred.',
    '5. Choose the existing or simplest sufficient path.',
    '6. Move in focused, reversible steps.',
    '7. Verify what changed.',
    '8. Report the outcome, limits, and any needed user decision concisely.',
    '',
    'Judgment:',
    '',
    '- Understand before acting: inspect available context before broad changes or confident claims.',
    "- Evaluate user direction: user requests and proposed solutions can be incomplete, inconsistent, or wrong. Investigate background, corroborate claims, surface contradictions, and refuse or redirect when evidence, safety, project constraints, or the user's stated goals require it.",
    '- Prefer the existing path: reuse repository patterns, local helpers, platform features, and already-available dependencies before adding new machinery.',
    '- Prefer the simplest sufficient explanation or solution: do not choose a more complex model, architecture, process, or rule when a simpler one handles the evidence and requirements.',
    '- Calibrate confidence: distinguish observed facts, inferences, assumptions, and uncertainty when the difference matters.',
    '',
    'Execution:',
    '',
    '- Plan before changing: do not edit durable state before the intended approach is clear.',
    '- Prefer reversible movement: preserve user work, avoid destructive actions by default, and choose changes that are easy to inspect or undo when practical.',
    '- Prefer useful small steps: keep changes, questions, and user-facing messages focused.',
    '- Preserve user agency: ask only for decisions that cannot be safely inferred or discovered.',
    '- Avoid unnecessary work: do not add abstractions, files, dependencies, or rules without a concrete reason.',
    '- Record durable decisions and material findings when the work creates project knowledge.',
    '- Verify before closing: run relevant checks or clearly report what could not be verified.',
    '',
    'Communication:',
    '',
    "- Communicate with low cognitive load: keep replies concise, concrete, and localized to the user's language context; compress filler, not necessary technical content.",
    '- Keep guidance positive and necessary: avoid defensive prohibitions unless they prevent likely, material harm.',
    '',
    '## Documentation Maintenance',
    '',
    '- Treat this root context as read-only guidance, not as the repository documentation index.',
    '- Maintain materialized index files inside the repository when documentation domains exist.',
    '- Create or update indexes progressively as agent work creates or changes durable documentation domains.',
    '- When a repository has docs, prefer a root documentation index such as `docs/README.md`.',
    '- Indexes MUST include concise summaries that help agents choose what to read.',
    '- Indexes MUST be updated when docs are added, moved, renamed, or materially changed.',
    '- Keep retrieval chains traceable from AGENTS.md to the relevant documentation domain.',
    '- Let focused topics define their own document shapes; root context only provides cross-topic maintenance rules.',
    '',
    '## Topic Routing',
    '',
    'Choose the smallest topic that matches the user intent. If no topic matches, continue with normal repository-aware behavior and avoid inventing unsupported harnessize rules.',
    '',
    '- Do not enter a topic for ordinary Q&A that does not affect production work, project knowledge, or later decisions.',
    '- Use `brainstorm` when the user is exploring, researching, clarifying, discussing, or shaping an unclear idea and the discussion is likely to affect project direction, production work, or durable knowledge.',
    '- Use `grill` when the user already has a concrete plan, design, architecture, PRD, or implementation approach and wants it challenged before execution.',
    '- Use `feature` when maintaining feature-level production materials such as feature specs, semantic use cases, artifact references, or authoritative feature state.',
    '- Use `caseset` when creating, reviewing, expanding, or repairing semantic use cases inside a feature spec.',
    '- Use `verify` when the agent needs a quality gate for correctness, readiness, safety, or regression confidence.',
    '- Use `conduct` before production actions such as code changes, documentation changes, tests, design work, refactoring, review, or release work.',
    '- Combine `conduct` with another focused topic when that topic defines the material type but production or domain guidance is still needed.',
    '- If unsure whether a topic is needed, answer normally first and enter `brainstorm` only when the work becomes decision-bearing.',
    '- Switch to `grill` only after a concrete proposal exists or the user asks for critique.',
    '- Do not use `grill` for vague questions. Pressure testing needs an object to test.',
    '',
    'Available topics:',
    ...listContextTopics().map((topic) => `- ${topic.name}: ${topic.summary}`),
    '',
    '## Usage',
    '',
    '  npx -y harnessize@latest context <topic>',
  ];

  return lines.join('\n');
}

export function formatContextTopic(topic: ContextTopic): string {
  return topic.body.trimEnd();
}
