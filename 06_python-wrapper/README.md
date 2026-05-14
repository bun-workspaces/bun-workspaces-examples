# `bun-workspaces` Example 06: Python Wrapper

This is a novelty example showing that `bun-workspaces` can be used purely as a
**script orchestrator** for non-JavaScript/TypeScript code. Each workspace contains Python scripts,
and its `package.json` exists only so `bw` can discover the workspace and invoke its
scripts.

If you're new to `bun-workspaces`, look at [**01_simple-zero-config**](../01_simple-zero-config)
first. This example reuses that minimal zero-config setup.

## Table of Contents

- [Why this example exists](#why-this-example-exists)
  - [Why you might use something like this](#why-you-might-use-something-like-this)
  - [What you give up](#what-you-give-up)
- [Getting Started](#getting-started)
- [Project Notes](#project-notes)
- [Things to Try](#things-to-try)
- [Further Reading](#further-reading)

## Why this example exists

This example exists mainly to highlight how `bun-workspaces` could be used purely as a
**script orchestrator** for non-JavaScript/TypeScript code, but this isn't officially recommending
it for Python-centric projects.

`package.json` scripts are simply shell commands, and [the Bun shell](https://bun.sh/docs/runtime/shell) is used on Windows and in `bun-workspaces`'s "inline scripts" feature for cross-platform
bash-like scripting, making it decent for cross-platform script definitions.

For a real Python-based monorepo, tools designed for Python (uv workspaces, hatch, pants, etc.)
will generally serve you better. This example is meant to illustrate the orchestrator side of `bun-workspaces`, not to recommend Bun as a Python package manager.

### Why you might use something like this

A reason you may have a project like this could be that you have a mix of mostly JS/TS code with some utilities in another language, or you are very strong with `bun-workspaces` and find certain features hard to live without even when working with a non-JS/TS project. In the latter case, you should be confident in the tradeoffs before pursuing.

### What you give up

**Dependencies aren't as meaningful.** Python (or other language) dependencies can't be managed by Bun. Cross-workspace dependencies could be set up symbolically, but there is no meaningful dependency resolution outside of JS/TS, making any dependency-related features of `bun-workspaces` generally irrelevant without manually configuring them solely to represent workspace relationships, like:

- Affected graph resolution
- Workspace dependency rules
- Dependency-related options like `--dep-order` when running scripts

What still works fine:

- Setting up scripts in workspaces' package.json files to be ran via `bun-workspaces`.
- Workspace dependencies set in package.json files or configured in workspace/script
  inputs purely to represent workspace relationships without any real code resolution features.
- Parallel/sequential execution, output styles, args interpolation, etc.

## Getting Started

Requirements:

- [Bun](https://bun.sh/docs/installation) v1.2 or higher
- Python 3 available as `python3` on your PATH

```bash
# Installs bun-workspaces itself.
bun install
```

## Project Notes

- Three workspaces live under `./packages/`: `loader`, `analyzer`, and `reporter`.
  Each has a `package.json` declaring two scripts and a `src/main.py` that
  uses only the Python standard library (no `pip` / `uv` / `pyproject.toml` involved).
- Each workspace's scripts shell out to `python3`:
  - `main`: runs `python3 src/main.py`
  - `check`: runs `python3 -m py_compile src/main.py` to byte-compile the source
    as a syntax check (no external linter required).

## Things to Try

Some commands are defined in the root `package.json` file.

```bash
# Run all workspaces' main scripts
bun run main
bun run check

# Run specific workspace's main script
bun run main:loader
bun run main:analyzer
bun run main:reporter

# Run all workspaces' check scripts
bun run check:loader
bun run check:analyzer
bun run check:reporter
```

## Further Reading

- [bun-workspaces Documentation](https://bunworkspaces.com)
  - [CLI reference](https://bunworkspaces.com/cli)
  - [Workspace Dependencies](https://bunworkspaces.com/concepts/workspace-dependencies)
  - [Workspace Inputs](https://bunworkspaces.com/config/workspace-inputs)
