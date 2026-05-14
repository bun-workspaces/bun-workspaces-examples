import type { SendMessageRequest, SendMessageResponse } from "./types.ts";

export interface ClientOptions {
  baseUrl: string;
}

export interface Client {
  sendMessage(payload: SendMessageRequest): Promise<SendMessageResponse>;
}

export const createClient = ({ baseUrl }: ClientOptions): Client => ({
  sendMessage: async (payload) => {
    const response = await fetch(`${baseUrl}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(
        `sendMessage failed: ${response.status} ${response.statusText}`,
      );
    }
    return (await response.json()) as SendMessageResponse;
  },
});
