
export interface SignupRequest {
  email?: string;
  password?: string;
  roleId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface ResetPassword extends LoginRequest {
  newPassword?: string;
  id?: string;
}
export interface VerifyToken extends LoginRequest {
  token?: string;
}