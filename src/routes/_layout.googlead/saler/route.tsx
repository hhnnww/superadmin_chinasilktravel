import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/googlead/saler")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
