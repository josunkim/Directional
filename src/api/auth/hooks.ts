"use client";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useAuthStore } from "./store";
import { login, LoginRequest, LoginResponse } from "./api";

export const useLogin = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginRequest
> => {
  const setAuth = useAuthStore((state) => state.login); // 로그인 후 상태 저장 함수

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
    onError: (error) => {
      console.error("로그인 실패", error);
    },
  });
};
