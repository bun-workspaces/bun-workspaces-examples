import type { SendMessageRequest, SendMessageResponse } from "@app-b/shared";
import { logRequest } from "backend-utils";

const PORT = Number(process.env.PORT ?? 3003);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const startServer = () =>
  Bun.serve({
    port: PORT,
    routes: {
      "/message": {
        OPTIONS: () => new Response(null, { headers: corsHeaders }),
        POST: async (request) => {
          logRequest("POST", "/message");
          const payload = (await request.json()) as SendMessageRequest;
          const body: SendMessageResponse = {
            reply: `[app-b] Hello, ${payload.name}! You said: "${payload.message}"`,
            receivedAt: new Date().toISOString(),
          };
          return Response.json(body, { headers: corsHeaders });
        },
      },
    },
  });
