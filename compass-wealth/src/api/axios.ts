import axios, {
  AxiosHeaders,
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return config;
  }

  const headers = AxiosHeaders.from(config.headers);
  if (!headers.get("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  config.headers = headers;

  return config;
});

const normalizeResponse = <T>(res: AxiosResponse<T>): T => res.data;

type AxiosErrorPayload = {
  message?: string;
  error?: string;
};

const toError = (err: AxiosError<AxiosErrorPayload>): Error => {
  const fallbackMessage = err.message || "Request failed";
  const data = err.response?.data;
  const message = data?.message || data?.error || fallbackMessage;
  return new Error(message);
};

export const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    instance
      .get<T>(url, config)
      .then((res) => normalizeResponse(res))
      .catch((err: AxiosError<AxiosErrorPayload>) => Promise.reject(toError(err))),
  post: <B, T = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    instance
      .post<T>(url, body, config)
      .then((res) => normalizeResponse(res))
      .catch((err: AxiosError<AxiosErrorPayload>) => Promise.reject(toError(err))),
  put: <B, T = unknown>(url: string, body: B, config?: AxiosRequestConfig) =>
    instance
      .put<T>(url, body, config)
      .then((res) => normalizeResponse(res))
      .catch((err: AxiosError<AxiosErrorPayload>) => Promise.reject(toError(err))),
  delete: <B, T = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    instance
      .delete<T>(url, { data: body, ...config })
      .then((res) => normalizeResponse(res))
      .catch((err: AxiosError<AxiosErrorPayload>) => Promise.reject(toError(err))),
};