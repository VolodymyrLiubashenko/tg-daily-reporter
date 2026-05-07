import axios from "axios";

/**
 * Safe one-line error for logs — avoids dumping Axios internals (headers with API keys).
 */
export function formatErrorForLog(error: unknown): string {
   if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const url = error.config?.url;
      const code = error.code;
      return `Axios ${code ?? "no-code"} status=${String(status)} url=${url ?? "?"}: ${error.message}`;
   }
   if (error instanceof Error) {
      return error.stack ?? error.message;
   }
   return String(error);
}
