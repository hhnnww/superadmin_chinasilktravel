import { PageTitle } from "@/component/PageTitle";
import { Button } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/googleAdpage/saler")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<PageTitle title="GoogleAdSaler" sub_header={<Button>Add New Saler</Button>} />
		</>
	);
}
