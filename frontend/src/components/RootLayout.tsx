import { Outlet } from "@tanstack/react-router";

export function RootLayout() {
            return (
                        <div className="min-h-screen bg-gray-50 text-gray-900">
                                    {/* Everything inside routes will render here */}
                                    <Outlet />
                        </div>
            );
}
