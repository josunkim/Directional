import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isLogin: boolean;

  initAuth: () => void;
  login: (accessToken: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isLogin: false,

  initAuth: () => {
    const token = Cookies.get("accessToken");
    if (token) {
      set({ accessToken: token, isLogin: true });
    }
  },

  login: (accessToken, user) => {
    Cookies.set("accessToken", accessToken, { expires: 1 });

    set({
      accessToken,
      user,
      isLogin: true,
    });
  },

  logout: () => {
    Cookies.remove("accessToken");

    set({
      accessToken: null,
      user: null,
      isLogin: false,
    });
  },
}));
