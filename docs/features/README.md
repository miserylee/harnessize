# Feature Materials Index

Feature materials are authoritative current-state production references. They describe what a
feature is expected to do and how agents should reason about it; they are not task plans,
execution logs, or todos.

## Feature Specs

- [Context Topics](context-topics.md): Defines the progressive context topic system, including root
  context routing and the current `brainstorm`, `grill`, `feature`, and `conduct` topics.

## Maintenance Rules

- Add one concise feature spec per feature at `docs/features/<feature-slug>.md` by default.
- Update this index whenever feature specs are added, moved, renamed, removed, or materially
  changed.
- Keep change reasoning in decision records and link to those records from feature specs.
