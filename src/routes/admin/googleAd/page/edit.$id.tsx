import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/googleAd/page/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/page/edit/$id"!</div>;
}
