import { TextField } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<TextField label="Admin" multiline rows={20} />
		</div>
	);
}
