import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/PhotoLibrary")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
