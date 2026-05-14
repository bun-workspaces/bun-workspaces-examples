import { startServer } from "./server.ts";

const server = startServer();

console.log(`[app-b] REST API listening at ${server.url}`);
