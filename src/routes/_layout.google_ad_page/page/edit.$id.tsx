import { Button, Grid } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";

import { CustomButtonLink } from "@/component/ButtonLink";
import { PageTitle } from "@/component/PageTitle";
import { supabaseClient } from "@/supabase";

import { GoogleAdPageEditItem } from "./-edit-item";
export const Route = createFileRoute("/_layout/google_ad_page/page/edit/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();

	// 获取当前页面的内容
	const query = useQuery({
		queryKey: ["googleAdPageEdit", params.id],
		queryFn: async () => {
			const page = (
				await supabaseClient
					.from("googleAdPage")
					.select("*")
					.eq("id", Number(params.id))
					.single()
			).data;
			const comments = await supabaseClient
				.from("googleAdPage")
				.select("*")
				.eq("parnet_id", Number(params.id))
				.order("id");
			return { page, comments };
		},
	});

	// 新建一个Comment
	const mutation = useMutation({
		mutationFn: async () =>
			await supabaseClient
				.from("googleAdPage")
				.insert({ parnet_id: query.data?.page?.id }),

		onSuccess: () => {
			query.refetch();
		},
	});

	return (
		<>
			<PageTitle
				title="Edit GoogleAdPage"
				sub_header={
					<CustomButtonLink
						to={"/google_ad_page/page"}
						variant="text"
						color="inherit"
						startIcon={<UndoOutlinedIcon />}
					>
						back googleAdpage list
					</CustomButtonLink>
				}
			/>
			{query?.data?.page && (
				<GoogleAdPageEditItem value={query.data.page} label={"adpage"} />
			)}
			{query.data?.comments.data?.map((item, index) => (
				<GoogleAdPageEditItem
					value={item}
					label={`comment ${index + 1}`}
					key={item.id.toString()}
				/>
			))}

			<Grid size={12}>
				<Button
					fullWidth
					size="large"
					onClick={async () => mutation.mutateAsync()}
					startIcon={<AddOutlinedIcon />}
					loading={mutation.isPending || query.isLoading}
				>
					add new comment
				</Button>
			</Grid>
		</>
	);
}
