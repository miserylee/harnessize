# Decision 0002: Brainstorm Topic

Date: 2026-06-27

## Context

Harnessize will dogfood its first context topic as `brainstorm`.

This topic is active when the user's intent is analysis, research, discussion, clarification, or
ideation. The purpose is to help the user's agent reduce cognitive load while moving ambiguous work
toward clear decisions.

## Decisions

The `brainstorm` topic should optimize for concise, rigorous, low-volume interaction.

The topic is exposed through:

```sh
npx harnessize@latest context brainstorm
```

Each assistant turn should focus on one key point or one tightly scoped decision area. A turn may
contain more than one question only when those questions belong to the same decision area.

The agent should do reasonable background work before asking the user to decide. Background work may
include inspecting repository files, searching existing documentation, checking external sources, or
retrieving relevant knowledge-base context when available.

The agent should ask the user only for information that cannot be safely inferred or discovered, and
should keep the decision burden low.

The agent should maintain a durable record of ongoing decisions. The durable record should capture
decisions, assumptions, open questions, and follow-up items rather than copying the full conversation.

Brainstorm records should include explicit date and time information. Use a concise numeric timezone
offset such as `2026-06-27 00:12 +08:00`. This makes later review, freshness checks, and
time-sensitive decisions easier to audit.

When the user briefly interrupts with unrelated work, the agent may temporarily step out of
`brainstorm` behavior. The agent should return to the main brainstorm thread unless the user clearly
exits or redirects the topic.

When leaving a brainstorm thread, the agent should decide whether the discussion needs to be
distilled into a durable document, knowledge base entry, or another long-lived carrier. The exact
carrier will be integrated with future harnessize topics later.

Long-running brainstorm records should be split after 50 discussion turns. This prevents a single
log from becoming expensive for agents to read and keeps future retrieval focused. The split policy
should preserve chronology and link related parts together.

## Working Guidance

A `brainstorm` response should usually:

1. State the current focus briefly.
2. Share only the minimum useful conclusion from investigation.
3. Ask for the next human decision only when needed.
4. Record settled decisions and important open questions with date and time.

The agent should avoid:

1. Sending broad multi-module analysis unless explicitly requested.
2. Asking questions before doing cheap investigation.
3. Treating every user interruption as a permanent topic change.
4. Recording raw chat as durable project knowledge.

## Response Template

Brainstorm turns should end with a clear, compact template when a decision or clarification is
needed:

```text
Focus: <one current decision area>
Settled: <what is already decided, if anything>
Need from you: <one low-burden decision or clarification>
```

The template may be shortened when no user decision is needed, but the final response should still
make the current state and next step obvious.

Use a record field only when there was an actual write, a record location changed, a log split
occurred, content was promoted into long-lived knowledge, or recording failed:

```text
Record: <only when relevant, include location and timestamp when applicable>
```

The template should be localized to the user's current language context. The structure should remain
consistent, but labels and prose should follow the language the user is using unless the user asks
otherwise.

## Additional Recommendation

The first implementation should distinguish between a working decision log and permanent project
knowledge.

During an active brainstorm, the agent may update a lightweight decision note. At topic exit, the
agent should promote only durable conclusions into the appropriate long-lived document. This keeps
the repository useful without turning it into a transcript archive.

Brainstorm record files should have a practical maximum of 50 discussion turns. When that threshold
is reached, the agent should continue in a new file and leave clear cross-links between the previous
and next parts.

## Open Questions

Where should active brainstorm notes live before future knowledge-base topics are designed?

What threshold should trigger automatic distillation when the user exits or redirects the topic?
