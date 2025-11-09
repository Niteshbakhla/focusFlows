import { refreshAccessToken } from "./auth";
import axios from "axios";

export const api = axios.create({
            baseURL: "http://localhost:5000/api", // change to your backend URL when deployed
            withCredentials: true, // ✅ needed for refreshToken cookie
});

// ✅ Add access token automatically to every request
api.interceptors.request.use((config) => {
            const token = localStorage.getItem("accessToken");

            if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
});


// ✅ Auto-refresh access token if expired
api.interceptors.response.use(
            (response) => response, // success → return response
            async (error) => {
                        const originalRequest = error.config;

                        // If access token expired
                        if (error.response?.status === 401 && !originalRequest._retry) {
                                    originalRequest._retry = true;

                                    try {
                                                // call refresh-token API
                                                const newToken = await refreshAccessToken();

                                                localStorage.setItem("accessToken", newToken);

                                                // set new token in headers
                                                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                                                return api(originalRequest); // retry request
                                    } catch (refreshError) {
                                                console.log("Refresh token failed", refreshError);
                                                localStorage.removeItem("accessToken");
                                                // window.location.href = "/login";
                                    }
                        }

                        return Promise.reject(error);
            }
);
