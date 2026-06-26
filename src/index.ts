export type HarnessTaskStatus = 'pending' | 'placeholder';

export interface HarnessTask {
  description: string;
  id: string;
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

export function createHarnessPlan(options: CreateHarnessPlanOptions): HarnessPlan {
  return {
    dryRun: Boolean(options.dryRun),
    targetDir: options.targetDir,
    tasks: [
      {
        id: 'inspect',
        description: 'Inspect repository structure, package metadata, and existing automation.',
        status: 'placeholder',
      },
      {
        id: 'plan',
        description: 'Generate a repository-specific AI harness plan.',
        status: 'placeholder',
      },
      {
        id: 'apply',
        description: 'Write selected harness files after the plan is confirmed.',
        status: 'placeholder',
      },
    ],
  };
}

export function formatHarnessPlan(plan: HarnessPlan): string {
  const lines = [
    'harnessize',
    '',
    `Target: ${plan.targetDir}`,
    `Mode: ${plan.dryRun ? 'dry run' : 'plan preview'}`,
    '',
    'Planned steps:',
    ...plan.tasks.map((task) => `- ${task.id}: ${task.description}`),
    '',
    'The CLI scaffold is ready. Concrete harnessing behavior will be added next.',
  ];

  return lines.join('\n');
}
