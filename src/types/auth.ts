export type AuthState = {
    user: User | null,
    setUser: (user: User) => void,
    logout: () => void,
    isAuth: boolean | null,
    setIsAuth: (isAuth: boolean) => void
}

export type User = {
    email: string,
    role: string
}