"use client";

import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Portal,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { toaster } from "../ui/toaster";
import { useLogin } from "@/src/api/auth/hooks";
import { useAuthStore } from "@/src/api/auth/store";
import { usePathname, useRouter } from "next/navigation";
import { loginSchema } from "@/src/schemas/auth.schema";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isBoardPage = pathname === "/board";
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <header>
      <HStack justifyContent={"space-between"}>
        <Button onClick={() => router.push("/")}>Home</Button>
        <Button
          variant={"ghost"}
          disabled={isBoardPage}
          onClick={() => router.push("/board")}
        >
          게시판
        </Button>
        <LoginModal />
      </HStack>
    </header>
  );
};

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isLogin, logout } = useAuthStore();
  const loginMutation = useLogin();

  const resetState = () => {
    setEmail("");
    setPassword("");
    setPasswordVisible(false);
  };

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      toaster.create({
        description: result.error.issues[0].message,
        type: "error",
      });
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          toaster.create({
            description: "로그인 성공",
            type: "success",
            duration: 2000,
          });
          setOpen(false);
        },
        onError: (error) => {
          toaster.create({
            description: "로그인 실패",
            type: "error",
          });
        },
      }
    );
  };

  const handleLogout = () => {
    logout();
    toaster.create({
      description: "로그아웃 되었습니다.",
      type: "success",
    });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        setOpen(details.open);
        if (!details.open) resetState();
      }}
    >
      {isLogin ? (
        <Button variant="solid" size="lg" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Dialog.Trigger asChild>
          <Button variant="solid" size="lg">
            Login
          </Button>
        </Dialog.Trigger>
      )}

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Login</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body display="flex" flexDirection="column" gap={4}>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputGroup
                endElement={
                  <IconButton
                    aria-label="Toggle password visibility"
                    size="xs"
                    variant="ghost"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    bgColor="white"
                  >
                    {passwordVisible ? <LuEyeOff /> : <LuEye />}
                  </IconButton>
                }
              >
                <Input
                  placeholder="Password"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                w="full"
                onClick={handleLogin}
                loading={loginMutation.isPending}
              >
                Login
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
