import index from "./index.html";

const server = Bun.serve({
  port: Number(process.env.PORT ?? 3002),
  development: true,
  routes: { "/": index },
});

console.log(`[app-b] Web dev server: ${server.url}`);
