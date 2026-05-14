export const A_HELLO = "Hello from workspace-a src/main.js";

if (import.meta.main) {
  console.log("Running");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(A_HELLO);
}
