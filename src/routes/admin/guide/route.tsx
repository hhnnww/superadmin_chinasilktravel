import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/guide")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
