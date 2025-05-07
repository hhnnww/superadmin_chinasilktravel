import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/googleAd/saler")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
