import { defineRootConfig } from "bun-workspaces/config";

export default defineRootConfig({
  defaults: {
    // Max scripts to run in parallel by default
    // Default is dynamically calculated based on CPU core availability
    parallelMax: 2,

    // Base ref for affected calculations
    // Default is "main"
    affectedBaseRef: "origin/main",

    // For running inline scripts.
    // Change to "system" to use sh (Linux/macOS) or cmd (Windows)
    // Default is "bun", the cross-platform bash-like Bun shell
    shell: "bun",

    // Whether to treat the root package.json
    // as a workspace by default. Default is false
    includeRootWorkspace: false,
  },
  workspacePatternConfigs: [
    // Add to workspaces' config in bulk.
    // Config is merged with any existing config.
    {
      // Match some subset of workspaces by pattern
      // Workspace patterns are the same as what can be passed to
      // other features like the CLI's `ls` or `run`
      patterns: ["*"],

      // The same type as a workspaces' config
      // Can pass a plain object or a function that receives
      // workspace data and the existing config.
      config: (rawWorkspace, prevConfig) => ({
        // Add the "package" tag to workspaces. This is appended to any tags already present
        // in the workspace's config
        tags: ["package"],

        // Inputs are used in features such as the affected graph features
        // Inputs are not merged but overwritten
        defaultInputs: {
          // Only files in workspaces' src directory are considered inputs
          // so only file changes in this directory will trigger affected workspaces
          files: ["src/**/*"],
        },
      }),
    },
    {
      // Each new entry merges config with any previously applied config
      patterns: ["tag:tag-c"],
      config: {
        scripts: {
          // If no other order is set
          // in other workspace configs,
          // hello for workspace-c runs
          // first when --parallel=false
          hello: {
            order: 0,
          },
        },
      },
    },
  ],
});
