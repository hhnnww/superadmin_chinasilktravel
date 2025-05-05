import { AdminHeader } from "@/component/admin_header";
import { supabase } from "@/supabase";
import { Container, Grid, Typography } from "@mui/material";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
	loader: async () => {
		const res = await supabase.auth.getSession();
		if (!res.data.session) {
			throw redirect({ to: "/login" });
		}
		return res;
	},
});

function RouteComponent() {
	const { data } = Route.useLoaderData();
	return (
		<>
			<AdminHeader email={data.session?.user.email || ""} />
			<Grid container>
				<Grid sx={{ width: "300px", minHeight: "100vh", p: 2 }}>
					<Typography variant="body1">sideabr2</Typography>
				</Grid>
				<Grid size={"grow"}>
					<Container maxWidth="lg" sx={{ py: 12 }}>
						<Outlet />
					</Container>
				</Grid>
			</Grid>
		</>
	);
}
