import { User } from "../../types/user";
import { api } from "../kyClient";

// 🔐 Fetch current user
export const fetchUser = async (): Promise<User> => {
  const res = await api.get("api/v1/user").json<{ user: User }>();
  return res.user;
};
