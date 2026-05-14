import type { SendMessageRequest, SendMessageResponse } from "shared";

const PORT = Number(process.env.PORT ?? 3001);

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
          const payload = (await request.json()) as SendMessageRequest;
          const body: SendMessageResponse = {
            reply: `Hello, ${payload.name}! You said: "${payload.message}"`,
            receivedAt: new Date().toISOString(),
          };
          return Response.json(body, { headers: corsHeaders });
        },
      },
    },
  });
