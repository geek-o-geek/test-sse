import { create } from "zustand";
import type { AuthState } from "@/types/auth";
import type { User } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuth: false,
    setUser: (user: User) => set({ user, isAuth: true }),
    logout: () => {
        set({ user: null, isAuth: false });
    },
    setIsAuth: (isAuth: boolean) => set({ isAuth }) 
}))