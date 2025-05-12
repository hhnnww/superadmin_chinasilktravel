import { CustomButtonLink } from "@/component/ButtonLink";
import { PageTitle } from "@/component/PageTitle";
import { supabaseClient } from "@/supabase";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/google_ad_page/saler/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const query = useQuery({
		queryKey: ["googlead", "saler", "edit"],
		queryFn: async () =>
			await supabaseClient
				.from("googleAdSaler")
				.select("*")
				.eq("id", Number(params.id))
				.single(),
	});
	return (
		<>
			<PageTitle
				title="GoogleAdSaler"
				sub_header={
					<CustomButtonLink to="/google_ad_page/saler">
						back googleadsaler
					</CustomButtonLink>
				}
			/>
			{JSON.stringify(query.data?.data, null, 4)}
		</>
	);
}
