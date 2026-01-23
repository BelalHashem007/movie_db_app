import type { ApiResponse } from "../app/apiSlice";
import * as z from "zod";

function isApiResponse(data: unknown): data is ApiResponse {
  if (
    typeof data === "object" &&
    data !== null &&
    "total_pages" in data &&
    "results" in data &&
    Array.isArray(data.results)
  )
    return true;
  return false;
}

function getDateFromIso(timestamp: string): string {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDuration(runtime: number): string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
}

const isDev = import.meta.env.VITE_DEVELOPMENT === "development";

const logger = {
  warn: (arg: string) => isDev && console.warn("[WARN]: ", arg),
  info: (arg: string) => isDev && console.info("[INFO]: ", arg),
  error: (err: string) => isDev && console.error("[INFO]: ", err),
};

function isValidEmail(email: string) {
  const User = z.object({
    email: z.email(),
  });

  const result = User.safeParse({ email });
  if (result.success) return true;
  else return false;
}


export { isApiResponse, getDateFromIso, getDuration, logger, isValidEmail };
