import type {
  AccountRequestDto,
  AccountResponseDto,
  ApiResponse,
  AuthUser,
  LoginAccountDto,
  Role,
  UpdateUserRoleRequestDto,
} from "../types/auth";
import { request } from "./axios";

export const authApi = {
  login: async (payload: LoginAccountDto): Promise<AuthUser> => {
    const result = await request.post<LoginAccountDto, ApiResponse<AccountResponseDto>>(
      "/auth/login",
      payload,
    );

    if (!result?.data?.token) {
      throw new Error("Login response is missing token");
    }

    return {
      ...result.data,
      token: result.data.token,
    };
  },

  register: async (payload: AccountRequestDto): Promise<string> => {
    const result = await request.post<AccountRequestDto, string>("/auth/create", payload);

    return result;
  },

  updateUserRole: async (
    userId: number,
    payload: UpdateUserRoleRequestDto,
  ): Promise<string> => {
    return request.put<UpdateUserRoleRequestDto, string>(`/api/v1/user/${userId}/role`, payload);
  },
};

export const roleOptions: Role[] = ["USER", "ADMIN"];