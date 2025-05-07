import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/googleAd/saler/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/googleAd/saler/edit/$id"!</div>;
}
