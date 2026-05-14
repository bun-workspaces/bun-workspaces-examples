import { formatTimestamp } from "common-utils";

export const logRequest = (method: string, path: string): void => {
  console.log(`[${formatTimestamp(new Date())}] ${method} ${path}`);
};
