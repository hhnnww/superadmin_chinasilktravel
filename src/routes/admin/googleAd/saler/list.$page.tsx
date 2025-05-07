import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/googleAd/saler/list/$page")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/googleAd/saler/list/$page"!</div>;
}
