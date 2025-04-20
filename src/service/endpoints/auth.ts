import { KyResponse } from "ky";
import { AuthenticateUserResponse } from "../../types/auth";
import { EndpointUserResponse } from "../../types/user";
import { api } from "../kyClient";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthenticateUserResponse> => {
  return api.post("api/v1/auth", { json: { email, password } }).json();
};

export const registerUser = async (
  email: string,
  name: string,
  password: string
): Promise<KyResponse<EndpointUserResponse>> => {
  return api.post("api/v1/user", { json: { email, password, name } });
};

export const logoutUser = async (): Promise<KyResponse<void>> => {
  return api.post("api/v1/auth/logout");
};
