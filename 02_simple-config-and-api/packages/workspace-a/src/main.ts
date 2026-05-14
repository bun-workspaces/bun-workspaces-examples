export const A_HELLO = "Hello from workspace-a src/main.ts";

if (import.meta.main) {
  console.log("Running");
  await Bun.sleep(1000);
  console.log(A_HELLO);
}

// hi
