const raw = import.meta.env.VITE_API_URL;
export const BASE_URL =
  typeof raw === "string" && raw.trim() !== ""
    ? raw.trim().replace(/\/$/, "")
    : "http://localhost:7777";