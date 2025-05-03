import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/ask/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/ask/"!</div>;
}
