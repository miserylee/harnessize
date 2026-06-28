# Branch Sync And Rebase Conduct

Status: Implemented

## Context

Agents can do substantial production work against stale local branches. Even if the worktree is
clean, the remote upstream or intended base branch may have moved, which can make review, release,
push, and handoff decisions unreliable.

This is a production behavior concern rather than a standalone harnessize topic. It belongs in
`context conduct` because agents should apply it when repository state freshness materially affects
durable work.

## Decisions

1. `context conduct` should tell agents to check current branch alignment with the remote upstream
   or base branch when repository freshness matters.
2. Trigger points include long-running work, review gates, push, release, and handoff.
3. Agents should fetch when appropriate and rebase when the branch is stale, rebase is the right
   integration path, and the operation is safe.
4. Agents must not blindly rebase over dirty worktrees, unresolved conflicts, or user changes. If a
   safe preservation path is unclear, they should ask.
5. This rule should stay inside the production extension of `conduct`; it should not become a new
   focused topic.

## Turn Log

### Turn 1 - Add branch freshness conduct - 2026-06-29 01:59 +08:00

- User signal: The user said agents should actually check whether the current branch is aligned
  with the remote base branch when necessary, and rebase in time.
- Agent work: Loaded root, `brainstorm`, `conduct`, and `feature` context. Fetched remote refs and
  confirmed the local `main` branch was aligned with `origin/main` before editing. Reviewed
  `conduct` production guidance and the context topics feature spec, then scoped the rule as
  production behavior inside `conduct`.
- Sources:
  - `node dist/cli.js context`
  - `node dist/cli.js context brainstorm`
  - `node dist/cli.js context conduct`
  - `node dist/cli.js context feature`
  - `git fetch --prune`
  - `git status -sb`
  - `src/context.ts`
  - `docs/features/context-topics.md`
  - `test/cli.test.ts`
- Decisions: Add a branch freshness and safe rebase rule to the `conduct` production extension, and
  update feature materials and tests so the behavior is discoverable and protected.
- Open questions: None for the first version.
