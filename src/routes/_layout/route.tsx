import { Container, Divider, Grid, Stack } from "@mui/material";
import { createFileRoute,Outlet } from "@tanstack/react-router";

import { supabaseClient } from "@/supabase";

import { Header } from "./-header";
import { LayoutSidebar } from "./-sidebar";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	loader: async () => await supabaseClient.auth.getSession(),
});

function RouteComponent() {
	const { data } = Route.useLoaderData();
	return (
		<>
			<Header email={data.session?.user.email || ""} />
			<Stack direction={"row"} mt={"70px"}>
				<LayoutSidebar />
				<Divider orientation="vertical" flexItem sx={{ ml: "300px" }} />
				<Container maxWidth="lg" sx={{ my: 18, minHeight: "100vh" }}>
					<Grid container spacing={8}>
						<Outlet />
					</Grid>
				</Container>
			</Stack>
		</>
	);
}
