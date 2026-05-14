<a href="https://bunworkspaces.com">
<img src="./.github/bwunster-bg-rect-title-wide_3000x900.png" alt="bun-workspaces logo" width="100%">
</a>

<br>

# `bun-workspaces` Examples

This repo contains examples of how to use `bun-workspaces` in a monorepo.

## Projects

Each directory in the repo is a self-contained Project.

Use one of these as your working directory to see `bun-workspaces` in action in a specific scenario,
running `bun install` to set up.

- [01: Simple Zero Config](./01_simple-zero-config) - Basics of using `bun-workspaces` in a vanilla Bun monorepo with no additional configuration.
- [02: Simple Config and API](./02_simple-config-and-api) - Like 01, but with optional configuration added and a TS API script.
- [03: Full Stack Web App](./03_full-stack-web-app) - A full-stack web app with frontend, backend, and shared packages that uses workspace dependency rules to prevent code sharing between frontend and backend.
- [04: Multiple Web Apps](./04_multi-web-app) - Like 03, but more complex to support multiple full stack web apps that can use some workspaces as generic libraries, with more comprehensive workspace dependency rules to prevent inappropriate code sharing.
- [05: Node Wrapper](./05_node-wrapper) - Like 01, but workspaces use Node over Bun for running JS scripts, while still resolving workspace dependencies thanks to Bun's ability to be used as a drop-in package manager for Node.
- [06: Python Wrapper](./06_python-wrapper) - A novelty example where workspaces primarily run Python scripts, with notes in its README about tradeoffs, since Bun's package management does not work for Python. This mainly illustrates how `bun-workspaces` can be used as a pure script orchestrator, since package.json scripts are simply shell commands.

## More

- Main Documentation: [https://bunworkspaces.com](https://bunworkspaces.com)
- Main Repository: [https://github.com/bun-workspaces/bun-workspaces](https://github.com/bun-workspaces/bun-workspaces)
