import { CustomButtonLink } from "@/component/ButtonLink";
import { PageTitle } from "@/component/PageTitle";
import { supabase } from "@/supabase";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { GoogleAdSalerEditForm } from "./-edit-form";

export const Route = createFileRoute("/admin/googleAd/saler/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const query = useQuery({
		queryKey: ["googleAdSalerEdit"],
		queryFn: async () => {
			const id = params.id;
			return await supabase.from("googleAdSaler").select("*").eq("id", Number(id)).single();
		},
	});

	return (
		<>
			<PageTitle
				title="GoogleAdSaler"
				sub_header={
					<CustomButtonLink variant="text" color="inherit" to={"/admin/googleAd/saler/list/$page"} params={{ page: "1" }} startIcon={<KeyboardBackspaceOutlinedIcon />}>
						Back Google Ad Saler List
					</CustomButtonLink>
				}
			/>
			{query.data?.data && <GoogleAdSalerEditForm value={query.data.data} label="edit Comment" />}
		</>
	);
}
