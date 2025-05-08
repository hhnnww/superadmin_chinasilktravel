import { CustomButtonLink } from "@/component/ButtonLink";
import { PageTitle } from "@/component/PageTitle";
import { supabase } from "@/supabase";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Button, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { EditForm } from "./-edit-form";
export const Route = createFileRoute("/admin/googleAd/page/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	const query = useQuery({
		queryKey: ["googleAdPageEdit"],
		queryFn: async () => {
			const page = (await supabase.from("googleAdPage").select("*").eq("id", Number(params.id)).single()).data;
			const comment_list = (
				await supabase
					.from("googleAdPage")
					.select("*")
					.eq("parnet_id", page?.id || 0)
					.order("id")
			).data;
			return { page, comment_list };
		},
	});

	return (
		<>
			<PageTitle
				title="Edit GoogleAdPage"
				sub_header={
					<CustomButtonLink color="inherit" variant="text" startIcon={<KeyboardBackspaceOutlinedIcon />} to={"/admin/googleAd/page/list/$page"} params={{ page: "1" }}>
						Back GoogleAdPage List
					</CustomButtonLink>
				}
			/>

			{query.data?.page && (
				<Grid size={12}>
					<EditForm value={query.data?.page} />
				</Grid>
			)}

			{query.data?.comment_list?.map((item, index) => (
				<EditForm key={item.id.toString()} value={item} label={`Comment: ${String(index + 1).padStart(2, "0")}`} />
			))}

			<Grid size={12}>
				<NewCommentButton parnet_id={query.data?.page?.id || 0} />
			</Grid>
		</>
	);
}

const NewCommentButton = (props: { parnet_id: number }) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () =>
			await supabase.from("googleAdPage").insert({
				parnet_id: props.parnet_id,
			}),
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["googleAdPageEdit"] });
		},
	});
	return (
		<Button disabled={mutation.isPending} fullWidth size={"large"} onClick={async () => await mutation.mutateAsync()}>
			Add New Comment
		</Button>
	);
};
