import { CustomButtonLink } from "@/component/ButtonLink";
import { PageTitle } from "@/component/PageTitle";
import { supabase } from "@/supabase";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { Button, Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LayoutEditItem } from "./-edit-item";
export const Route = createFileRoute("/_layout/googlead/page/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	const query = useQuery({
		queryKey: ["googleadpage", "edit"],
		queryFn: async () => {
			const page = (
				await supabase
					.from("googleAdPage")
					.select("*")
					.eq("id", Number(params.id))
					.single()
			).data;

			return {
				page,
				comments:
					(
						await supabase
							.from("googleAdPage")
							.select("*")
							.eq("parnet_id", page?.id ?? 0)
							.order("id")
					).data || [],
			};
		},
	});

	const mutation = useMutation({
		mutationFn: async () =>
			await supabase
				.from("googleAdPage")
				.insert({ parnet_id: query.data?.page?.id ?? 0 }),
		onSuccess: () => {
			query.refetch();
		},
	});
	return (
		<>
			<PageTitle
				title="GoogeAdPage Edit"
				sub_header={
					<CustomButtonLink
						variant="text"
						startIcon={<KeyboardReturnOutlinedIcon />}
						to="/googlead/page"
					>
						Back GoogleAdPage List
					</CustomButtonLink>
				}
			/>

			<Grid size={12}>
				{query?.data?.page && (
					<LayoutEditItem value={query.data?.page} label="page" />
				)}
			</Grid>

			{query?.data?.comments?.map((comment, index) => (
				<Grid size={12} key={comment.id}>
					<LayoutEditItem value={comment} label={`comment ${index + 1}`} />
				</Grid>
			))}

			<Grid size={12}>
				<Button
					fullWidth
					onClick={async () => mutation.mutateAsync()}
					disabled={mutation.isPending}
					startIcon={<AddOutlinedIcon />}
				>
					Add New Comment
				</Button>
			</Grid>
		</>
	);
}
