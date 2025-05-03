import { AdminSidebar } from "@/page_component/admini_sidebar";
import { alpha } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
	component: RouteComponent,
	beforeLoad: async () => {
		console.log("beforeLoad");
	},
});

function RouteComponent() {
	return (
		<Grid container>
			<Grid size={"auto"} sx={{ width: "300px", height: "100vh", backgroundColor: "#252e3e", overflowY: "auto", color: "#fff" }}>
				<AdminSidebar />
			</Grid>
			<Grid size={"grow"} sx={{ width: "100%", backgroundColor: alpha("#000", 0.01) }}>
				<Container sx={{ my: 12 }}>
					<Grid container spacing={4}>
						<Outlet />
					</Grid>
				</Container>
			</Grid>
		</Grid>
	);
}
