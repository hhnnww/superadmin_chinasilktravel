import { AdminSidebar } from "@/page_component/admini_sidebar";
import { supabase } from "@/supabase";
import { alpha } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

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
		<Grid container>
			<Grid size={"auto"} sx={{ width: "300px", height: "100vh", backgroundColor: "#252e3e", overflowY: "auto", color: "#fff", position: "fixed" }}>
				<AdminSidebar email={data.session?.user.email || ""} />
			</Grid>
			<Grid size={"grow"} sx={{ width: "100%", backgroundColor: alpha("#000", 0.01), ml: "300px", minHeight: "100vh" }}>
				<Container sx={{ my: 12 }}>
					<Grid container spacing={4}>
						<Outlet />
					</Grid>
				</Container>
			</Grid>
		</Grid>
	);
}
