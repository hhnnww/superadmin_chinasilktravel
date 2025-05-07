import { PageTitle } from "@/component/PageTitle";
import { supabase } from "@/supabase";
import { Box, Button, Divider, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { produce } from "immer";
import { PageEditComponent } from "./-page-edit-component";

export const Route = createFileRoute("/admin/googleAdpage/page/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const queryClient = useQueryClient();

	// 获取PAGE
	const query = useQuery({
		queryKey: ["googleAdPageEdit"],
		queryFn: async () => {
			const page = (await supabase.from("googleAdPage").select("*").eq("id", Number(params.id)).single()).data;
			const comments = (await supabase.from("googleAdPage").select("*").eq("parnet_id", Number(params.id)).order("id")).data;
			return { page, comments };
		},
	});

	// 新建COMMENT
	const inserCommentMutation = useMutation({
		mutationFn: async () => {
			return await supabase
				.from("googleAdPage")
				.insert({ parnet_id: Number(params.id) })
				.select("*")
				.single();
		},
		onSuccess: ({ data }) => {
			queryClient.setQueryData(["googleAdPageEdit"], (oldData: typeof query.data) =>
				produce(oldData, (draft) => {
					if (draft?.comments && data) {
						draft.comments.push(data);
					}
				}),
			);
		},
	});

	return (
		<>
			<PageTitle title="编辑谷歌广告页面" />
			{query.data?.page && <PageEditComponent values={query.data.page} index={"AdPage"} />}
			{query.data?.comments?.map((item, index) => (
				<Box key={item.id?.toString()}>
					<Divider sx={{ mb: 5 }} />
					<PageEditComponent values={item} index={`AdComment ${index + 1}`} />
				</Box>
			))}
			<Grid size={12}>
				<Button fullWidth disabled={query.isFetching} onClick={() => inserCommentMutation.mutate()}>
					新建一个回复
				</Button>
			</Grid>
		</>
	);
}
