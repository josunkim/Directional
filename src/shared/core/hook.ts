"use client";

import { useLogin } from "@/src/api/auth/hooks";
import { toaster } from "../ui/toaster";

export const loginClick = async (email: string, password: string) => {
  const { mutate } = useLogin();
  return mutate(
    { email, password },
    {
      onSuccess: () => {
        toaster.create({
          description: "로그인 성공",
          type: "success",
        });
      },
      onError: (error) => {
        toaster.create({
          description: error instanceof Error ? error.message : "로그인 실패",
          type: "error",
        });
      },
    }
  );
};
