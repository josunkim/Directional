import { apiClient } from "../axios";

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export type LoginRequest = {
  email: string;
  password: string;
};
/**
 * @param email
 * @param password
 * @returns
 */
export const login = async (Request: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/auth/login", {
    email: Request.email,
    password: Request.password,
  });
  return response.data;
};
