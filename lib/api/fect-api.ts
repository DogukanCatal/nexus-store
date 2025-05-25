import type { ApiResponse } from "@/types/api/base";

export async function fetchApi<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(input, init);
    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: json?.error || "Unknown error occurred",
      };
    }

    return {
      success: true,
      data: json.data as T,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
