import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { applyHarnessPlan, createHarnessPlan, formatHarnessPlan } from '../src/index.js';

const tempDirs: string[] = [];

function createTempDir(): string {
  const tempDir = mkdtempSync(join(tmpdir(), 'harnessize-'));
  tempDirs.push(tempDir);
  return tempDir;
}

afterEach(() => {
  for (const tempDir of tempDirs.splice(0)) {
    rmSync(tempDir, { force: true, recursive: true });
  }
});

describe('createHarnessPlan', () => {
  it('creates the initial harnessization plan', () => {
    const plan = createHarnessPlan({ dryRun: true, targetDir: '/repo' });

    expect(plan).toMatchObject({
      dryRun: true,
      targetDir: '/repo',
    });
    expect(plan.tasks.map((task) => task.id)).toEqual(['agents', 'claude-code', 'cursor', 'codex']);
    expect(plan.tasks.find((task) => task.id === 'codex')).toMatchObject({
      path: 'AGENTS.md',
      status: 'native',
    });
  });
});

describe('applyHarnessPlan', () => {
  it('writes AGENTS.md and adapter files by default', () => {
    const tempDir = createTempDir();
    const plan = applyHarnessPlan({ targetDir: tempDir });

    expect(readFileSync(join(tempDir, 'AGENTS.md'), 'utf8')).toContain(
      'npx -y harnessize@latest context',
    );
    expect(readFileSync(join(tempDir, 'CLAUDE.md'), 'utf8')).toContain('@AGENTS.md');
    expect(readFileSync(join(tempDir, '.cursor/rules/harnessize.mdc'), 'utf8')).toContain(
      '@AGENTS.md',
    );
    expect(plan.tasks.filter((task) => task.status === 'created').map((task) => task.id)).toEqual([
      'agents',
      'claude-code',
      'cursor',
    ]);
  });

  it('does not overwrite existing instruction files', () => {
    const tempDir = createTempDir();
    const agentsPath = join(tempDir, 'AGENTS.md');
    writeFileSync(agentsPath, 'custom instructions\n', 'utf8');

    const plan = applyHarnessPlan({ targetDir: tempDir });

    expect(readFileSync(agentsPath, 'utf8')).toBe('custom instructions\n');
    expect(plan.tasks.find((task) => task.id === 'agents')).toMatchObject({
      status: 'skipped',
    });
  });

  it('does not write harness files during dry runs', () => {
    const tempDir = createTempDir();

    const plan = applyHarnessPlan({ dryRun: true, targetDir: tempDir });

    expect(existsSync(join(tempDir, 'AGENTS.md'))).toBe(false);
    expect(existsSync(join(tempDir, 'CLAUDE.md'))).toBe(false);
    expect(plan.tasks.find((task) => task.id === 'claude-code')).toMatchObject({
      status: 'planned',
    });
  });
});

describe('formatHarnessPlan', () => {
  it('renders a readable CLI preview', () => {
    const output = formatHarnessPlan(createHarnessPlan({ dryRun: true, targetDir: '/repo' }));

    expect(output).toContain('Target: /repo');
    expect(output).toContain('Mode: dry run');
    expect(output).toContain('Agent coverage: Codex, Claude Code, Cursor');
    expect(output).toContain('AGENTS.md');
    expect(output).toContain('CLAUDE.md');
    expect(output).toContain('.cursor/rules/harnessize.mdc');
  });
});
