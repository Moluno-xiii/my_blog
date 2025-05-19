import axios from "axios";

function handleError(err: unknown, type: "response" | "message") {
  if (axios.isAxiosError(err)) {
    if (type === "response") {
      return err.response?.data?.error ?? "No response message";
    } else {
      return err.message;
    }
  }

  if (err instanceof Error && type === "message") {
    return err.message;
  }

  return "An unexpected error occurred";
}

export { handleError };
