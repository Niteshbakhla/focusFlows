import { Link, Outlet } from "@tanstack/react-router";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../context/AuthContext";
import { tasksRoute } from "../root";

export function DashboardPage() {
            const { logout } = useAuth();

            return (
                        <div className="flex min-h-screen">
                                    {/* Sidebar */}
                                    <aside className="w-60 bg-black/90 text-white p-5 flex flex-col gap-6">
                                                <h1 className="text-xl font-bold">FocusFlow</h1>

                                                <nav className="flex flex-col gap-3">
                                                            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                                                            <Link
                                                                        to={tasksRoute.to}
                                                                        className="hover:underline"
                                                            >
                                                                        My Tasks
                                                            </Link>
                                                </nav>

                                                <div className="mt-auto">
                                                            <Button
                                                                        variant="secondary"
                                                                        className="w-full bg-red-500 hover:bg-red-600 text-white"
                                                                        onClick={logout}
                                                            >
                                                                        Logout
                                                            </Button>
                                                </div>
                                    </aside>
                                    <Outlet />

                        </div>
            );
}
