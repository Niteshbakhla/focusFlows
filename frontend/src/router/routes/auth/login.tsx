import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { registerRoute } from "../root";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";


export function LoginPage() {

            const { login } = useAuth();
            const navigate = useNavigate({ from: "/login" });

            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");

            // Temporary local state for now
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState("");

            const handleSubmit = async (e: React.FormEvent) => {
                        e.preventDefault();
                        setLoading(true);
                        setError("");

                        try {
                                    await login(email, password);
                                    navigate({ to: "/dashboard" })
                        } catch (error: any) {
                                    setError(error?.response?.data?.message || "Login failed");
                        }

                        setLoading(false);
            };

            return (
                        <div className="flex items-center justify-center min-h-screen px-4">
                                    <Card className="w-full max-w-md shadow-lg border">
                                                <CardHeader>
                                                            <CardTitle className="text-2xl font-bold text-center">
                                                                        Login to FocusFlow
                                                            </CardTitle>
                                                </CardHeader>

                                                <CardContent>
                                                            <form onSubmit={handleSubmit} className="space-y-4">

                                                                        {/* Email */}
                                                                        <div>
                                                                                    <Label className="mb-2" htmlFor="email">Email</Label>
                                                                                    <Input
                                                                                                id="email"
                                                                                                type="email"
                                                                                                placeholder="your@email.com"
                                                                                                value={email}
                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                    />
                                                                        </div>

                                                                        {/* Password */}
                                                                        <div>
                                                                                    <Label className="mb-2" htmlFor="password">Password</Label>
                                                                                    <Input
                                                                                                id="password"
                                                                                                type="password"
                                                                                                placeholder="*******"
                                                                                                value={password}
                                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                    />
                                                                        </div>

                                                                        {/* Error */}
                                                                        {error && (
                                                                                    <p className="text-red-500 text-sm">{error}</p>
                                                                        )}

                                                                        {/* Submit */}
                                                                        <Button type="submit" className="w-full" disabled={loading}>
                                                                                    {loading ? "Logging in..." : "Login"}
                                                                        </Button>

                                                                        {/* Footer */}
                                                                        <p className="text-center text-sm text-gray-600 pt-2">
                                                                                    Don't have an account?{" "}
                                                                                    <Link to={registerRoute.to} className="text-blue-600 hover:underline font-medium">
                                                                                                Register
                                                                                    </Link>
                                                                        </p>
                                                            </form>
                                                </CardContent>
                                    </Card>
                        </div>
            );
}
