# `bun-workspaces` Example 02: Simple Config and API

This is a simple example of `bun-workspaces` use in a plain Bun monorepo
but showcasing the optional configuration and TypeScript API.

If you're new to `bun-workspaces`, you might look at the [**01_simple-zero-config**](../01_simple-zero-config) example first
for an overview of `bun-workspaces`'s minimum integration and some basic usage that this example builds off of.

Both of these examples use a similar workspace structure, so you can use similar CLI commands as the first example.

Table of Contents:

- [Getting Started](#getting-started)
- [Project Notes](#project-notes)
- [Things to Try](#things-to-try)
  - [CLI](#cli)
  - [API](#api)
- [Further Reading](#further-reading)

## Getting Started

Requirements: [Bun](https://bun.sh/docs/installation) v1.2 or higher.

```bash
bun install
```

`bun-workspaces` doesn't know your workspace data until `bun install` is run, and you may
need to run it again if you make changes to package.json files.

## Project Notes

- Each workspace contains `bw.workspace.ts`, an optional config file. The workspaces'
  configs are also enriched by `bw.root.ts`'s `workspacePatternConfigs`.
- `bw.root.ts` is optional and sets some default values to be used for the project
  along with the mentioned `workspacePatternConfigs`.
- `./api-run-main.ts` shows how the TypeScript API can be used to run the "main" script
  across workspaces in a similar manner to the CLI `bw run main`. The `project` contains
  all core functionality of the package, and thanks to TypeScript you can explore
  what's available easily.

## Things to Try

### CLI

The additional configuration allows for some more advanced CLI usage:

```bash
# Reference a workspace by its configured alias
bw info a

# Note that in wildcard/regex patterns,
# only names are matched by default,
# to prevent ambiguity due to different naming
# conventions between names/aliases
bw ls "workspace-*"
bw ls "re:workspace-.+"

# Explicitly use aliases in workspace patterns
bw ls "alias:a"
bw ls "alias:re:.+" # regex modifier

# Tags are set in workspace configs
# and can be shared between workspaces
bw ls-tags
bw tag-info my-tag

# Use tags in workspace patterns
bw ls "tag:my-tag"
bw ls "tag:tag-*"

# Running hello sequentially
# runs workspace-c first thanks
# to its "hello": { order: 0 } config
bw run hello --parallel=false

# Since bw.root.ts sets defaultInputs to only include src/ files
# in workspacePatternConfigs for all workspaces,
# this file should not trigger any affected workspaces
bw ls-affected --files="packages/workspace-a/not-an-input.txt"
# Since this is an src/ input file, it should consider workspace-a affected
bw ls-affected --files="packages/workspace-a/src/main.ts"
```

### API

Run the API script at `./api-run-main.ts`:

```bash
bun api-run-main.ts
```

## Further Reading

- [bun-workspaces Documentation](https://bunworkspaces.com)
  - [CLI reference](https://bunworkspaces.com/cli)
  - [TypeScript API reference](https://bunworkspaces.com/api)
  - [Workspace aliases](https://bunworkspaces.com/concepts/workspace-aliases)
  - [Workspace patterns](https://bunworkspaces.com/concepts/workspace-patterns)
  - [Configuration reference](https://bunworkspaces.com/config)
    - [Root config](https://bunworkspaces.com/config/root)
    - [Workspace config](https://bunworkspaces.com/config/workspace)
    - [Workspace inputs](https://bunworkspaces.com/config/workspace-inputs)
