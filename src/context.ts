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
- Focus each turn on one key point or one tightly scoped decision area.
- Do reasonable background work before asking the user to decide.
- Ask only for information that cannot be safely inferred or discovered.
- Keep each human decision small enough to answer quickly.
- If the user briefly interrupts with unrelated work, handle it and return to the brainstorm thread unless they clearly exit or redirect.

## Recording Rules

- Maintain a durable record of decisions, assumptions, open questions, and follow-up items.
- Do not copy the raw chat transcript into project knowledge.
- Include explicit date and time in records.
- Use concise numeric timezone offsets, for example: 2026-06-27 00:12 +08:00.
- Split long-running brainstorm records after 50 discussion turns.
- When splitting, preserve chronology and link the previous and next files.
- When exiting the topic, decide whether durable conclusions should be promoted into a long-lived document or knowledge base.

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

const topics = [brainstormTopic] as const;

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

export function formatContextTopicList(): string {
  const lines = [
    'harnessize context',
    '',
    'Available topics:',
    ...listContextTopics().map((topic) => `- ${topic.name}: ${topic.summary}`),
    '',
    'Usage:',
    '  npx harnessize@latest context <topic>',
  ];

  return lines.join('\n');
}

export function formatContextTopic(topic: ContextTopic): string {
  return topic.body.trimEnd();
}
