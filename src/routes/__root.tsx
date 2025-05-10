import { CssBaseline, ThemeProvider } from "@mui/material";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext,Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";

import { theme } from "@/theme";

import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import TanstackQueryLayout from "../integrations/tanstack-query/layout";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Analytics />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Outlet />
			</ThemeProvider>
			<TanStackRouterDevtools />
			<TanstackQueryLayout />
		</>
	),
});
