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

function getDateFromIso(timestamp: string):string {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleDateString(undefined,{
    year:"numeric",
    month:"long",
    day:"numeric"
  });
}

function getDuration(runtime: number):string {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  return `${hours}h ${minutes}m`;
}


export { isApiResponse, getDateFromIso,getDuration };
