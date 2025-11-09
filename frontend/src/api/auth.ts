import axios from "axios";
import { api } from "./axios";

// ✅ Register
export async function registerUser(data: { email: string; password: string }) {
            const res = await api.post("/auth/register", data);
            return res.data;
}

// ✅ Login
export async function loginUser(data: { email: string; password: string }) {
            const res = await api.post("/auth/login", data);
            return res.data;
}

// ✅ Refresh Token
export async function refreshAccessToken() {
            const res = await api.post("/auth/refresh-token");
            return res.data.accessToken;
}

// ✅ Logout
export async function logoutUser() {
            const res = await api.post("/auth/logout");
            return res.data;
}
