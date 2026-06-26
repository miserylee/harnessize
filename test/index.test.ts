import { describe, expect, it } from 'vitest';

import { createHarnessPlan, formatHarnessPlan } from '../src/index.js';

describe('createHarnessPlan', () => {
  it('creates the initial harnessization plan', () => {
    const plan = createHarnessPlan({ dryRun: true, targetDir: '/repo' });

    expect(plan).toMatchObject({
      dryRun: true,
      targetDir: '/repo',
    });
    expect(plan.tasks.map((task) => task.id)).toEqual(['inspect', 'plan', 'apply']);
  });
});

describe('formatHarnessPlan', () => {
  it('renders a readable CLI preview', () => {
    const output = formatHarnessPlan(createHarnessPlan({ targetDir: '/repo' }));

    expect(output).toContain('Target: /repo');
    expect(output).toContain('Planned steps:');
  });
});
