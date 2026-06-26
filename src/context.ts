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

Use this topic when work needs feature-level production materials: feature specs, semantic use cases, product/interaction references, prototype references, artifact references, or updates to authoritative feature state.

Do not use this topic as a task plan. Feature materials describe the current authoritative feature understanding; task planning and execution records belong elsewhere.

## Purpose

Keep feature-level production materials complete, current, reviewable, and useful as implementation and regression references for humans and agents.

## Operating Rules

- Treat feature materials as authoritative sources for the current feature state.
- Keep feature specs concise enough to stay maintainable.
- Keep decision process and change reasoning in \`brainstorm\` records; cite them from feature materials when relevant.
- Update feature materials when product behavior, user stories, interactions, semantic use cases, artifact references, or implementation direction materially change.
- Use repository exploration plus feature materials to understand actual implementation state.
- Preserve root documentation rules: indexes MUST include summaries and MUST be updated when docs change.

## Feature Spec

Use one concise document per feature by default:

\`\`\`text
docs/features/<feature-slug>.md
\`\`\`

A feature spec should usually include:

- Background and goals.
- Links to relevant research and discussion records.
- User stories.
- Product design and interaction design.
- Prototype or artifact references.
- Feature design and implementation direction.
- Functional breakdown as an authoritative implementation reference.
- Semantic use cases for human review and agent self-check regression.
- Related production artifact references.

## Semantic Use Case Shape

Keep semantic use cases fixed and concise:

\`\`\`text
- Given <context/state>
  When <user/system action>
  Then <observable expectation>
\`\`\`

## Boundaries

Feature specs should not contain task breakdowns, execution logs, todos, or step-by-step work records.

When a feature changes, update the feature spec to the new authoritative state. Keep the change decision trail in \`brainstorm\` and link to it when useful.
`,
};

const topics = [brainstormTopic, grillTopic, featureTopic] as const;

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
    'Use this command as the root guideline for soft-orchestrating agent work. Load focused topics only when the current user intent needs them.',
    '',
    '## Operating Rules',
    '',
    '- Keep repository changes minimal and reversible.',
    '- Inspect the repository before making broad edits.',
    '- Preserve user changes and existing project conventions.',
    '- Ask the user only for decisions that cannot be safely inferred or discovered.',
    '- Prefer focused topic context over large, all-purpose instruction dumps.',
    '- Record durable decisions and material findings when the work creates project knowledge.',
    '- Run relevant verification before reporting implementation work as complete.',
    '',
    '## Documentation Maintenance',
    '',
    '- Treat this root context as read-only guidance, not as the repository documentation index.',
    '- Maintain materialized index files inside the repository when documentation domains exist.',
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
    '- If unsure whether a topic is needed, answer normally first and enter `brainstorm` only when the work becomes decision-bearing.',
    '- Switch to `grill` only after a concrete proposal exists or the user asks for critique.',
    '- Do not use `grill` for vague questions. Pressure testing needs an object to test.',
    '',
    'Available topics:',
    ...listContextTopics().map((topic) => `- ${topic.name}: ${topic.summary}`),
    '',
    '## Usage',
    '',
    '  npx harnessize@latest context <topic>',
  ];

  return lines.join('\n');
}

export function formatContextTopic(topic: ContextTopic): string {
  return topic.body.trimEnd();
}
