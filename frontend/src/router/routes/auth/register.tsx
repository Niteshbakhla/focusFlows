import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { loginRoute } from "../root";
import { useAuth } from "../../../context/AuthContext";

export function RegisterPage() {
            const { register } = useAuth();
            const navigate = useNavigate({ from: "/register" });

            const [email, setEmail] = useState("");
            const [password, setPassword] = useState("");
            const [confirmPassword, setConfirmPassword] = useState("");

            const [loading, setLoading] = useState(false);
            const [error, setError] = useState("");

            const handleRegister = async (e: React.FormEvent) => {
                        e.preventDefault();
                        setError("");

                        if (password !== confirmPassword) {
                                    setError("Passwords do not match");
                                    return;
                        }

                        setLoading(true);

                        try {
                                    await register(email, password);
                                    navigate({ to: "/dashboard" });
                        } catch (error: any) {
                                    setError(error?.response?.data?.message || "Registration failed");
                        }

                        setLoading(false);
            };

            return (
                        <div className="flex items-center justify-center min-h-screen px-4">
                                    <Card className="w-full max-w-md shadow-lg border">
                                                <CardHeader>
                                                            <CardTitle className="text-2xl font-bold text-center">
                                                                        Create Account
                                                            </CardTitle>
                                                </CardHeader>

                                                <CardContent>
                                                            <form className="space-y-4" onSubmit={handleRegister}>

                                                                        {/* Email */}
                                                                        <div>
                                                                                    <Label className="mb-2">Email</Label>
                                                                                    <Input
                                                                                                type="email"
                                                                                                placeholder="your@email.com"
                                                                                                value={email}
                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                    />
                                                                        </div>

                                                                        {/* Password */}
                                                                        <div>
                                                                                    <Label className="mb-2">Password</Label>
                                                                                    <Input
                                                                                                type="password"
                                                                                                placeholder="******"
                                                                                                value={password}
                                                                                                onChange={(e) => setPassword(e.target.value)}
                                                                                    />
                                                                        </div>

                                                                        {/* Confirm Password */}
                                                                        <div>
                                                                                    <Label className="mb-2">Confirm Password</Label>
                                                                                    <Input
                                                                                                type="password"
                                                                                                placeholder="******"
                                                                                                value={confirmPassword}
                                                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                    />
                                                                        </div>

                                                                        {error && <p className="text-red-500 text-sm">{error}</p>}

                                                                        <Button className="w-full" disabled={loading}>
                                                                                    {loading ? "Registering..." : "Register"}
                                                                        </Button>

                                                                        <p className="text-center text-sm text-gray-600 pt-2">
                                                                                    Already have an account?{" "}
                                                                                    <Link
                                                                                                to={loginRoute.to}
                                                                                                className="text-blue-600 hover:underline font-medium"
                                                                                    >
                                                                                                Login
                                                                                    </Link>
                                                                        </p>
                                                            </form>
                                                </CardContent>
                                    </Card>
                        </div>
            );
}
