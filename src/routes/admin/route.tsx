import { supabase } from "@/supabase";
import { Container, Grid } from "@mui/material";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { AdminHeader } from "./-header";
import { AdminSidebar } from "./-sidebar";

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
	const { data } = Route.useLoaderData();
	return (
		<>
			<AdminHeader email={data.session?.user.email || ""} />
			<Grid container>
				<Grid sx={{ width: "300px", minHeight: "100vh", p: 2 }}>
					<AdminSidebar />
				</Grid>
				<Grid size={"grow"}>
					<Container maxWidth="lg" sx={{ py: 12 }}>
						<Grid container spacing={6}>
							<Outlet />
						</Grid>
					</Container>
				</Grid>
			</Grid>
		</>
	);
}
