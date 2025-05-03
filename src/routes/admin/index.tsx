import { PageTitle } from "@/page_component/page_title";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<PageTitle title="AdminIndex" />
		</>
	);
}
