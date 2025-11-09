import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes/root";
import { queryClient } from "../queryClient";
import { useAuth } from "../context/AuthContext";

// ✅ STEP 1: Create router and define context SHAPE
export const router = createRouter({
            routeTree,
            context: {
                        auth: undefined as any,
                        queryClient: queryClient,
            },
});

// ✅ STEP 2: EXTEND TYPES (VERY IMPORTANT)
declare module "@tanstack/react-router" {
            interface Register {
                        router: typeof router;
            }
}

// ✅ STEP 3: Provide actual context values
export function AppRouter() {
            const auth = useAuth();

            return (
                        <RouterProvider
                                    router={router}
                                    context={{
                                                auth,
                                                queryClient,
                                    }}
                        />
            );
}
