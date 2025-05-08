import { supabase } from "@/supabase";
import { Container, Divider, Grid } from "@mui/material";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { AdminHeader } from "./-admin-header";
import { AdminSidebar } from "./-admin-sidebar";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (!data.session) {
			throw redirect({ to: "/login" });
		}
	},
	loader: async () => {
		return await supabase.auth.getSession();
	},
});

function RouteComponent() {
	const session = Route.useLoaderData();
	return (
		<>
			<AdminHeader email={session.data.session?.user.email || ""} />
			<Grid container sx={{ mt: "70px" }}>
				<Grid size={"auto"} sx={{ width: 300, height: "100vh", position: "fixed" }}>
					<AdminSidebar />
				</Grid>
				<Divider orientation="vertical" flexItem />
				<Grid size={"grow"} sx={{ ml: "300px" }}>
					<Container sx={{ py: 18 }}>
						<Grid container spacing={6}>
							<Outlet />
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</>
	);
}
