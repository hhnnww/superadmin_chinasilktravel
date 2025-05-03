import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/advice/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/advice/"!</div>;
}
