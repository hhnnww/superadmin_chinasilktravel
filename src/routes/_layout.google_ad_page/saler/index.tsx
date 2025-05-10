import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/google_ad_page/saler/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_layout/google_ad_page/saler/list"!</div>;
}
