# `bun-workspaces` Example 01: Simple Zero Config

This is a simple example of `bun-workspaces` use in a plain vanilla Bun monorepo
without any special configuration.

The next example, [**02_simple-config-and-api**](../02_simple-config-and-api) uses a similar
project structure as this example, but with optional config present and use of the TS library.

This example gives a basic introduction to the minimal `bun-workspaces` setup and commands,
helping inform how subsequent examples work.

Table of Contents:

- [Getting Started](#getting-started)
- [Project Notes](#project-notes)
- [Things to Try](#things-to-try)
  - [CLI](#cli)
  - [Affected Workspaces](#affected-workspaces)
- [Further Reading](#further-reading)

## Getting Started

Requirements: [Bun](https://bun.sh/docs/installation) v1.2 or higher.

```bash
bun install
```

`bun-workspaces` doesn't know your workspace data until `bun install` is run, and you may
need to run it again if you make changes to package.json files.

## Project Notes

- `./CLAUDE.md` shows how you can use `bun-workspaces`'s AGENTS.md file for agent context
  - Your agent can create code with `bun-workspaces` as if it's been trained on how to use it
  - Your agent can explain `bun-workspaces` to you or help debug issues with it
- The root `./package.json`
  - The "workspaces" array is used to define the workspaces in the monorepo
  - The "scripts" are able to use `bw` for the CLI by default without setting up a shell alias
- The workspaces in `./packages/`
  - All workspaces share scripts "hello" and "main", which can be ran via `bun-workspaces`
  - `workspace-c` depends on `workspace-b`, which depends on `workspace-a`. You can
    see these configured in each workspace's package.json "dependencies" field.

## Things to Try

### CLI

You can run some CLI commands to see `bun-workspaces` in action:

```bash
# You can try the root package.json scripts
# which can be nice passthroughs for bw commands
bun hello
bun main
bun run-a hello
bun run-b main
bun run-c hello

alias bw="bunx bun-workspaces"

# Usage
bw --help
bw --version
bw help run # help for specific commands

# List workspaces
bw ls
bw ls --json --pretty

# List workspaces using workspace patterns
bw ls "*-a"
bw ls "path:packages/*" "not:workspace-b"

# Regex modifier in workspace patterns
bw ls "re:.+-a"
bw ls "path:re:packages.+a$"

# Info about a specific workspace
bw info workspace-a

# List available scripts
bw ls-scripts

# Info about a specific script
bw script-info hello

# Run the main script across all workspaces
bw run main

# Run the main script for a specific workspace
bw run main workspace-a

# Run the main script for multiple specific workspaces
bw run main workspace-a workspace-b

# Run the main script for workspaces matching a pattern
bw run main "*-a"

# Run the main script with plain output with workspace name prefixes
# Style "grouped" is the default for TTY, falling back to "prefixed".
# Use --output-style=plain for plain output lines with no prefixes
bw run main --output-style=prefixed

# Script runs so that dependencies are run before dependents
bw run main --dep-order

# Only two scripts can run concurrently at a time
bw run main --parallel=2

# Run sequentially
bw run main --parallel=false

# Run a one-off command using workspace script metadata
bw run "echo <workspaceName> at <workspaceRelativePath>" --inline

# Use workspace script metadata in appended args to each script call
bw run hello --args="my appended <scriptName> args"
```

### Affected Workspaces

The "affected graph" is the graph of workspaces that are affected by a change.

By default, this is compared using git against `main` unless `--base` is specified,
and uncommitted changes are compared against the base.

If you edit files in `workspace-b`, for example, the affected graph will include `workspace-b` and `workspace-c`,
since `workspace-c` depends on `workspace-b`.

If you edit files in `workspace-a`, the affected graph will include `workspace-b` and `workspace-c`,
since `workspace-c` depends on `workspace-b` and `workspace-b` depends on `workspace-a`.

You can also pass `--files` which will be treated as changed files.

```bash
# By default compares HEAD against main
bw ls-affected

# Debug the affected reasons
bw ls-affected --explain
bw ls-affected --explain --detailed

# Specify refs for comparison (can be commit SHA, branch name, tag etc.)
bw ls-affected --base=my-branch-a --head=my-branch-b

# Specify files for comparison
bw ls-affected --files=packages/workspace-a/src/index.ts

# Ignore uncommitted changes (can also ignore only unstaged, staged, or untracked)
bw ls-affected --ignore-uncommitted

# Run affected workspaces' scripts (takes similar options as both run and ls-affected)
bw run-affected hello
```

## Further Reading

- [Documentation](https://bunworkspaces.com)
  - [Glossary](https://bunworkspaces.com/concepts/glossary)
  - [CLI reference](https://bunworkspaces.com/cli)
  - [Workspace dependencies](https://bunworkspaces.com/concepts/workspace-dependencies)
  - [Workspace patterns](https://bunworkspaces.com/concepts/workspace-patterns)
  - [Affected workspaces](https://bunworkspaces.com/concepts/affected)
