import { supabase } from "@/supabase";
import { Box, Container, Divider, Grid, Stack } from "@mui/material";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { LayoutHeader } from "./-header";
import { LayoutSidebar } from "./-sidebar";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (!data.session) {
			throw redirect({ to: "/login" });
		}
	},
});

function RouteComponent() {
	return (
		<>
			<LayoutHeader />
			<Stack direction={"row"} sx={{ width: "100%", mt: "64px" }}>
				<Box
					sx={{
						width: "100%",
						maxWidth: "350px",
						height: "100vh",
						py: 2,
						position: "fixed",
						zIndex: 1,
					}}
				>
					<LayoutSidebar />
				</Box>
				<Divider orientation="vertical" flexItem sx={{ ml: "350px" }} />
				<Box sx={{ width: "100%" }}>
					<Container maxWidth="lg" sx={{ py: 18 }}>
						<Grid container spacing={12}>
							<Outlet />
						</Grid>
					</Container>
				</Box>
			</Stack>
		</>
	);
}
