import type { ApiResponse } from "../app/apiSlice";

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

function getDateFromIso(timestamp: string) {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString(undefined,{
    year:"numeric",
    month:"long",
    day:"numeric"
  });
}

export { isApiResponse, getDateFromIso };
