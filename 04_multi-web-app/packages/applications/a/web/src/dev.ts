import index from "./index.html";

const server = Bun.serve({
  port: Number(process.env.PORT ?? 3000),
  development: true,
  routes: { "/": index },
});

console.log(`[app-a] Web dev server: ${server.url}`);
