// workspace-a depends on workspace-b in package.json,
// so it can import from its "main" file.
import { B_HELLO } from "workspace-b";

if (import.meta.main) {
  console.log("Running");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(B_HELLO.replace("-b", "-c"));
}
