import { KyResponse } from "ky";
import { api } from "../kyClient";
import { GetUserResponse } from "@proto/user/user.ts";
import { AuthenticateResponse, LogoutResponse } from "@proto/auth/auth.ts";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthenticateResponse> => {
  return api
    .post("api/v1/auth", { json: { email, password }, credentials: "include" })
    .json();
};

export const registerUser = async (
  email: string,
  name: string,
  password: string
): Promise<KyResponse<GetUserResponse>> => {
  return api.post("api/v1/user", { json: { email, password, name } });
};

export const logoutUser = async (): Promise<KyResponse<LogoutResponse>> => {
  return api.post("api/v1/auth/logout", { credentials: "include" });
};
