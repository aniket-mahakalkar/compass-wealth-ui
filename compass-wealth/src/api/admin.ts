import type { AccountResponseDto, ApiResponse } from "@/types/auth";
import { request } from "./axios";

export const AdminApi = {
    
  getUsers: async (): Promise<AccountResponseDto[]> => {
    const result = await request.get<ApiResponse<AccountResponseDto[]>>("/api/v1/users");
    return result.data;
  },

}