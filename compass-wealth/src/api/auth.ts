import type {
  AccountRequestDto,
  AccountResponseDto,
  ApiResponse,
  AuthUser,
  LoginAccountDto,
  Role,
  UpdateUserRoleRequestDto,
} from "../types/auth";

const API_BASE = "http://localhost:8080";

const getErrorMessage = async (response: Response): Promise<string> => {
  const fallbackMessage = `Request failed with status ${response.status}`;

  try {
    const maybeJson = (await response.json()) as { message?: string; error?: string };
    return maybeJson.message || maybeJson.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const request = async <T>(
  path: string,
  init?: RequestInit,
  token?: string,
): Promise<T> => {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return (await response.json()) as T;
};

export const authApi = {
  login: async (payload: LoginAccountDto): Promise<AuthUser> => {
    const result = await request<ApiResponse<AccountResponseDto>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!result?.data?.token) {
      throw new Error("Login response is missing token");
    }

    return {
      ...result.data,
      token: result.data.token,
    };
  },

  register: async (payload: AccountRequestDto): Promise<string> => {
    const result = await request<string>("/auth/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return result;
  },

  getUsers: async (token: string): Promise<AccountResponseDto[]> => {
    const result = await request<ApiResponse<AccountResponseDto[]>>(
      "/api/v1/users",
      { method: "GET" },
      token,
    );
    return result.data;
  },

  updateUserRole: async (
    token: string,
    userId: number,
    payload: UpdateUserRoleRequestDto,
  ): Promise<string> => {
    return request<string>(
      `/api/v1/user/${userId}/role`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      },
      token,
    );
  },
};

export const roleOptions: Role[] = ["USER", "ADMIN"];