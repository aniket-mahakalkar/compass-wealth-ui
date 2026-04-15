export type Role = "ADMIN" | "USER";

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface AccountRequestDto {
  id?: number;
  username: string;
  password: string;
  email: string;
  role?: Role;
}

export interface LoginAccountDto {
  email: string;
  password: string;
}

export interface AccountResponseDto {
  id: number;
  username: string;
  email: string;
  role: Role;
  token?: string;
}

export interface UpdateUserRoleRequestDto {
  role: Role;
}

export interface AuthUser extends AccountResponseDto {
  token: string;
}

export type AppPermission =
  | "route:dashboard"
  | "route:admin"
  | "users:read"
  | "users:update-role";