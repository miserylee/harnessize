import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { CliError, helpText, parseArgs, run } from '../src/cli.js';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const tempDirs: string[] = [];

function createTempDir(): string {
  const tempDir = mkdtempSync(resolve(tmpdir(), 'harnessize-'));
  tempDirs.push(tempDir);
  return tempDir;
}

describe('parseArgs', () => {
  it('uses the current directory as the default target', () => {
    expect(parseArgs([], '/workspace')).toEqual({
      command: 'init',
      dryRun: false,
      help: false,
      json: false,
      targetDir: '/workspace',
      version: false,
    });
  });

  it('parses a target directory and flags', () => {
    expect(parseArgs(['project', '--dry-run', '--json'], '/workspace')).toMatchObject({
      dryRun: true,
      json: true,
      targetDir: resolve('/workspace', 'project'),
    });
  });

  it('parses the context command and topic', () => {
    expect(parseArgs(['context', 'brainstorm'], '/workspace')).toMatchObject({
      command: 'context',
      contextTopic: 'brainstorm',
    });
  });

  it('rejects unknown options', () => {
    expect(() => parseArgs(['--unknown'], '/workspace')).toThrow(CliError);
  });

  it('does not accept adapter mode flags because agent coverage is default', () => {
    expect(() => parseArgs(['--agent-adapters'], '/workspace')).toThrow(CliError);
    expect(() => parseArgs(['--multi-agent'], '/workspace')).toThrow(CliError);
  });
});

describe('helpText', () => {
  it('documents npx usage', () => {
    expect(helpText()).toContain('npx -y harnessize@latest [target] [options]');
    expect(helpText()).toContain('npx -y harnessize@latest context [topic]');
  });
});

describe('bin entrypoint', () => {
  it('does not run when the CLI module is imported', () => {
    const result = spawnSync(
      process.execPath,
      ['--import', 'tsx', '--input-type=module', '--eval', 'await import("./src/cli.ts");'],
      {
        cwd: repoRoot,
        encoding: 'utf8',
      },
    );

    expect(result.status).toBe(0);
    expect(result.stderr).toBe('');
    expect(result.stdout).toBe('');
  });

  it('runs through a symlinked package bin', () => {
    const tempDir = mkdtempSync(join(tmpdir(), 'harnessize-cli-'));

    try {
      const sourceBinPath = fileURLToPath(new URL('../src/bin.ts', import.meta.url));
      const binPath = join(tempDir, 'harnessize');
      symlinkSync(sourceBinPath, binPath);
      const result = spawnSync(process.execPath, ['--import', 'tsx', binPath, 'context'], {
        cwd: repoRoot,
        encoding: 'utf8',
      });

      expect(result.status).toBe(0);
      expect(result.stderr).toBe('');
      expect(result.stdout).toContain('# harnessize context');
    } finally {
      rmSync(tempDir, { force: true, recursive: true });
    }
  });
});

describe('run', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    for (const tempDir of tempDirs.splice(0)) {
      rmSync(tempDir, { force: true, recursive: true });
    }
  });

  it('writes harness and adapter files through init by default', async () => {
    const tempDir = createTempDir();
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run([tempDir], '/workspace')).resolves.toBe(0);

    expect(readFileSync(resolve(tempDir, 'AGENTS.md'), 'utf8')).toContain(
      'npx -y harnessize@latest context',
    );
    expect(readFileSync(resolve(tempDir, 'CLAUDE.md'), 'utf8')).toContain('@AGENTS.md');
    expect(readFileSync(resolve(tempDir, '.cursor/rules/harnessize.mdc'), 'utf8')).toContain(
      '@AGENTS.md',
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Agent coverage: Codex, Claude Code, Cursor'),
    );
  });

  it('prints root context guidelines', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('agent-facing workflow guidance'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('soft-orchestrating agent work'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Use `npx -y harnessize@latest context` as the root guideline'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('include `-y` so package execution does not stop'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Baseline Conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Application loop'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining("Evaluate the user's request and proposed approach"),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Form an explicit plan before changing durable state'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('smallest reversible step'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Prefer the existing path'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('rerun `npx -y harnessize@latest context`'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Evaluate user direction'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Budget complexity'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('brainstorm'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('grill'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('feature'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('caseset'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('verify'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('review'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('ordinary Q&A'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Documentation Maintenance'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('docs/README.md'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Indexes MUST include concise summaries'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Use `conduct` before production actions'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Combine `conduct` with another focused topic'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('answer normally first'));
  });

  it('prints the brainstorm topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'brainstorm'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('# harnessize context: brainstorm'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('MUST-record obligation'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('3-6 short lines'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('active subject record'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Reuse prior answers'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('material research findings'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('subject relevance'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Start a separate record'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Record Shape'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Sources: <URLs'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('50 discussion turns'));
  });

  it('prints the grill topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'grill'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: grill'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('concrete plan'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Pressure-test the plan'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Recommended path'));
  });

  it('prints the feature topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'feature'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: feature'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('MUST-maintain obligation'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('docs/features/<feature-slug>.md'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('docs/features/README.md'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Semantic Use Cases'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Use `caseset`'));
  });

  it('prints the caseset topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'caseset'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: caseset'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('semantic use cases'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Case Shape'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Preconditions'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('not a short name'));
  });

  it('prints the verify topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'verify'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: verify'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('quality gate'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('self-heal'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Evidence Selection'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Claim: <what is being verified>'));
  });

  it('prints the review topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'review'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: review'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('findings-first'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Worktree review'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('git status and git diff'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('P0'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('P1'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('P2'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Do not create durable review artifacts'),
    );
  });

  it('prints the conduct topic', async () => {
    const stdout = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);

    await expect(run(['context', 'conduct'], '/workspace')).resolves.toBe(0);

    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('# harnessize context: conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('production work'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('ordinary Q&A'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Root Baseline Dependency'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('root baseline conduct'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Production Extension'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Identify the durable surface being changed'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('scoped to the current evidence'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('repository freshness matters'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('remote upstream or base branch'));
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Do not rebase over dirty worktrees'),
    );
    expect(stdout).toHaveBeenCalledWith(
      expect.stringContaining('Baseline conduct lives in root context'),
    );
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Extension Boundary'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Domain Extension: Coding'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Add an abstraction only when'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Scale verification to risk'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Unit tests'));
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Do not pursue 100% coverage'));
  });

  it('rejects unknown context topics', async () => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await expect(run(['context', 'missing'], '/workspace')).resolves.toBe(1);

    expect(stderr).toHaveBeenCalledWith(expect.stringContaining('Unknown context topic: missing'));
  });

  it('keeps conduct domains inside the conduct topic', async () => {
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const stderr = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await expect(run(['context', 'conduct-coding'], '/workspace')).resolves.toBe(1);

    expect(stderr).toHaveBeenCalledWith(
      expect.stringContaining('Unknown context topic: conduct-coding'),
    );
  });
});
