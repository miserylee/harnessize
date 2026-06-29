import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type HarnessTaskStatus = 'created' | 'native' | 'planned' | 'skipped';

export interface HarnessTask {
  description: string;
  id: string;
  path?: string;
  reason?: string;
  status: HarnessTaskStatus;
}

export interface HarnessPlan {
  dryRun: boolean;
  tasks: HarnessTask[];
  targetDir: string;
}

export interface CreateHarnessPlanOptions {
  dryRun?: boolean;
  targetDir: string;
}

interface HarnessArtifact {
  content: string;
  description: string;
  id: string;
  path: string;
}

const agentsArtifact: HarnessArtifact = {
  id: 'agents',
  path: 'AGENTS.md',
  description: 'Create the AGENTS.md single source of truth for harnessize guidance.',
  content: `# AGENTS.md instructions

This repository uses harnessize for thin, progressive agent guidance.

## Start Here

1. Run \`npx -y harnessize@latest context\` as required session bootstrap before repository work.
2. Follow the root context to choose any focused topic supported by the installed harnessize version.
3. Inspect the relevant code and docs before making durable changes.
4. Keep repository changes minimal and preserve user work.
5. Run relevant verification before reporting implementation work as complete.

If conversation context has been compacted or your short-term memory no longer contains the
harnessize root context, run \`npx -y harnessize@latest context\` again before continuing repository
work.

## Multi-Agent Adapters

Keep durable harness guidance in this file. Adapter files such as \`CLAUDE.md\` or
\`.cursor/rules/harnessize.mdc\` should only point agents back here so the repository has one source
of truth.
`,
};

const adapterArtifacts: HarnessArtifact[] = [
  {
    id: 'claude-code',
    path: 'CLAUDE.md',
    description: 'Create a Claude Code adapter that imports AGENTS.md instead of duplicating it.',
    content: `@AGENTS.md

# Claude Code Adapter

This file intentionally delegates to AGENTS.md so harnessize guidance has one source of truth.
Keep durable harness guidance in AGENTS.md. Add only Claude Code-specific adapter notes here when
needed.
`,
  },
  {
    id: 'cursor',
    path: '.cursor/rules/harnessize.mdc',
    description: 'Create a Cursor project rule that routes Cursor Agent to AGENTS.md.',
    content: `---
description: "Route Cursor Agent to the repository harness guidance in AGENTS.md."
alwaysApply: true
---

# Harnessize Adapter

Read and follow @AGENTS.md before repository work.

Keep durable harness guidance in AGENTS.md. This rule is only an adapter so the repository has one
source of truth.
`,
  },
];

export function createHarnessPlan(options: CreateHarnessPlanOptions): HarnessPlan {
  const dryRun = Boolean(options.dryRun);
  const artifacts = [agentsArtifact, ...adapterArtifacts];

  return {
    dryRun,
    targetDir: options.targetDir,
    tasks: [
      ...artifacts.map((artifact) => createArtifactTask(artifact, options.targetDir)),
      {
        id: 'codex',
        path: agentsArtifact.path,
        description: 'Codex uses AGENTS.md directly, so no extra Codex adapter file is needed.',
        status: 'native',
      },
    ],
  };
}

export function applyHarnessPlan(options: CreateHarnessPlanOptions): HarnessPlan {
  const plan = createHarnessPlan(options);

  if (plan.dryRun) {
    return plan;
  }

  mkdirSync(plan.targetDir, { recursive: true });

  const artifactById = new Map(
    [agentsArtifact, ...adapterArtifacts].map((artifact) => [artifact.id, artifact]),
  );

  return {
    ...plan,
    tasks: plan.tasks.map((task) => {
      const artifact = artifactById.get(task.id);

      if (!artifact || task.status === 'skipped' || task.status === 'native') {
        return task;
      }

      const artifactPath = join(plan.targetDir, artifact.path);

      if (existsSync(artifactPath)) {
        return {
          ...task,
          status: 'skipped',
          reason:
            'file already exists; keep user content and merge harnessize guidance manually if needed',
        };
      }

      mkdirSync(dirname(artifactPath), { recursive: true });
      writeFileSync(artifactPath, artifact.content, 'utf8');

      return {
        ...task,
        status: 'created',
      };
    }),
  };
}

export function formatHarnessPlan(plan: HarnessPlan): string {
  const lines = [
    'harnessize',
    '',
    `Target: ${plan.targetDir}`,
    `Mode: ${plan.dryRun ? 'dry run' : 'apply'}`,
    'Agent coverage: Codex, Claude Code, Cursor',
    '',
    'Harness files:',
    ...plan.tasks.map(formatTask),
  ];

  return lines.join('\n');
}

function createArtifactTask(artifact: HarnessArtifact, targetDir: string): HarnessTask {
  if (existsSync(join(targetDir, artifact.path))) {
    return {
      id: artifact.id,
      path: artifact.path,
      description: artifact.description,
      status: 'skipped',
      reason:
        'file already exists; keep user content and merge harnessize guidance manually if needed',
    };
  }

  return {
    id: artifact.id,
    path: artifact.path,
    description: artifact.description,
    status: 'planned',
  };
}

function formatTask(task: HarnessTask): string {
  const path = task.path ? `${task.path}: ` : '';
  const reason = task.reason ? ` (${task.reason})` : '';

  return `- ${path}${task.status}: ${task.description}${reason}`;
}
