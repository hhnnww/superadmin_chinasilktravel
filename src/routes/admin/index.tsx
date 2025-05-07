import { Grid, TextField } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Grid size={12}>
				<TextField label="Admin" multiline rows={20} />
			</Grid>
		</>
	);
}
