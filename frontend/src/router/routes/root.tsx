import { redirect, createRoute, createRootRouteWithContext } from "@tanstack/react-router";
import { RootLayout } from "../../components/RootLayout";
import { LoginPage } from "./auth/login";
import { RegisterPage } from "./auth/register";
import { DashboardPage } from "./dashboard/index";
import { TasksPage } from "./dashboard/task";

export const rootRoute = createRootRouteWithContext<{
            auth: any;
            queryClient: any;
}>()({
            component: RootLayout,
});


export const indexRoute = createRoute({
            getParentRoute: () => rootRoute,
            path: "/",
            component: LoginPage,
});

export const loginRoute = createRoute({
            getParentRoute: () => rootRoute,
            path: "/login",
            beforeLoad: ({ context }) => {
                        if (context.auth.user) {
                                    throw redirect({ to: "/dashboard" });
                        }
            },
            component: LoginPage,
});

export const registerRoute = createRoute({
            getParentRoute: () => rootRoute,
            path: "/register",
            component: RegisterPage,
});

export const dashboardRoute = createRoute({
            getParentRoute: () => rootRoute,
            path: "/dashboard",
            beforeLoad: ({ context }) => {
                        if (!context.auth?.user) {
                                    // throw redirect({ to: "/login" });
                        }
            },
            component: DashboardPage,
});

export const tasksRoute = createRoute({
            getParentRoute: () => dashboardRoute,
            path: "tasks",
            beforeLoad: ({ context }) => {
                        const { auth } = context;
                        // if (!auth.user) throw redirect({ to: "/login" });
            },
            component: TasksPage,
});

export const routeTree = rootRoute.addChildren([
            indexRoute,
            loginRoute,
            registerRoute,
            dashboardRoute.addChildren([tasksRoute])
]);
