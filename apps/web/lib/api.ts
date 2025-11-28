export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

async function request<T>(path: string, options: RequestInit = {}, tokenKey = "token"): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {})
    }
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message ?? "Erro ao comunicar com API");
  }
  return response.json();
}

const createApi = (tokenKey: string) => ({
  get: <T>(path: string) => request<T>(path, {}, tokenKey),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }, tokenKey),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined }, tokenKey),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }, tokenKey)
});

export const api = createApi("token");
export const portalApi = createApi("portal-token");
