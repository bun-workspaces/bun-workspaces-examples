import { startServer } from "./server.ts";

const server = startServer();

console.log(`REST API listening at ${server.url}`);
