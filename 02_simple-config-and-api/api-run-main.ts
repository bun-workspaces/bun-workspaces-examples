import { createFileSystemProject } from "bun-workspaces";

// The project is read from the process.cwd()
// but can be explicitly passed in an options argument
const project = createFileSystemProject();

const { output, summary } = project.runScriptAcrossWorkspaces({
  // The only required option
  // With only this, scripts run in parallel
  // for all workspaces with the "main" script
  script: "main",

  // Not required:
  // workspacePatterns: ["*"], // specify workspaces
  // parallel: false, // run sequentially
  // ignoreOutput: true, // don't stream output (can save memory)
  // dependencyOrder: true, // dependents wait for dependencies to finish
  // ignoreDependencyFailure: true, // use with dependencyOrder
  // onScriptEvent: (event) => {
  //   console.log(event);
  // },
  // args: "--my-arg=<workspaceName>", // append args
});

// Stream output from all scripts
for await (const { chunk, metadata } of output.text()) {
  // The text content
  console.log(chunk);

  // Metadata including the originating workspace
  // and whether the output is from stdout or stderr
  console.log(metadata);
}

const exitResults = await summary;

// Get the summary of the run
// This is the same type as the CLI's --json-outfile.
console.log(exitResults);
