import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../api/auth";
import toast from "react-hot-toast";

interface User {
            email: string;
            id: string;
}

interface AuthContextType {
            user: User | null;
            accessToken: string | null;
            loading: boolean;

            login: (email: string, password: string) => Promise<void>;
            register: (email: string, password: string) => Promise<void>;
            logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
            const [user, setUser] = useState<User | null>(null);
            const [accessToken, setAccessToken] = useState<string | null>(
                        localStorage.getItem("accessToken")
            );
            const [loading, setLoading] = useState(true);

            // ✅ Load user from token on app start
            useEffect(() => {
                        const initialize = async () => {
                                    if (accessToken) {
                                                try {
                                                            // Try refreshing token (ensures user session is valid)
                                                            const newToken = await refreshAccessToken();
                                                            localStorage.setItem("accessToken", newToken);
                                                            setAccessToken(newToken);

                                                            // decode the token or hit /me endpoint (we'll decode manually later)
                                                            // for now, fake user just to keep app running
                                                            setUser({ id: "temp", email: "temp@example.com" });

                                                } catch {
                                                            setUser(null);
                                                            localStorage.removeItem("accessToken");
                                                }
                                    }
                                    setLoading(false);
                        };

                        initialize();
            }, []);

            // ✅ LOGIN FUNCTION
            const login = async (email: string, password: string) => {

                        const res = await loginUser({ email, password });

                        const token = res.accessToken;
                        localStorage.setItem("accessToken", token);
                        toast.success(res.message)
                        setAccessToken(token);
                        setUser(res.user);
            };

            // ✅ REGISTER FUNCTION
            const register = async (email: string, password: string) => {
                        const res = await registerUser({ email, password });

                        const token = res.accessToken;
                        localStorage.setItem("accessToken", token);

                        setAccessToken(token);
                        setUser(res.user);
            };

            // ✅ LOGOUT FUNCTION
            const logout = async () => {
                        await logoutUser();
                        setAccessToken(null);
                        setUser(null);
                        localStorage.removeItem("accessToken");
            };

            return (
                        <AuthContext.Provider
                                    value={{
                                                user,
                                                accessToken,
                                                loading,
                                                login,
                                                register,
                                                logout,
                                    }}
                        >
                                    {children}
                        </AuthContext.Provider>
            );
}

export const useAuth = () => {
            const ctx = useContext(AuthContext);
            if (!ctx) {
                        throw new Error("useAuth must be used inside AuthProvider");
            }
            return ctx;
};
