export interface SendMessageRequest {
  name: string;
  message: string;
}

export interface SendMessageResponse {
  reply: string;
  receivedAt: string;
}
