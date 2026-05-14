import { startServer } from "./server.ts";

const server = startServer();

console.log(`[app-a] REST API listening at ${server.url}`);
