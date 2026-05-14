import { A_HELLO } from "workspace-a";

export const B_HELLO = A_HELLO.replace("-a", "-b");

if (import.meta.main) {
  console.log("Running");
  await Bun.sleep(1000);
  console.log(B_HELLO);
}
