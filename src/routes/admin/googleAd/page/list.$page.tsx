import { CustomLink } from "@/component/MuiLink";
import { PageTitle } from "@/component/PageTitle";
import { CustomTable } from "@/component/Table";
import { supabase } from "@/supabase";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/googleAd/page/list/$page")({
	component: RouteComponent,
});

function RouteComponent() {
	const { page } = Route.useParams();
	const limit = 10;
	const query = useQuery({
		queryKey: ["googleAdPageList"],
		queryFn: async () =>
			await supabase
				.from("googleAdPage")
				.select("id,title")
				.is("parnet_id", null)
				.order("id")
				.range((Number(page) - 1) * limit, Number(page) * limit - 1),
	});

	const table_headers = ["TITLE", "ACTION"];
	const table_body = query.data?.data
		? query.data.data.map((item) => {
				return [
					<Stack key={item.id.toString()}>
						<Typography>{item.title || "无标题文档"}</Typography>
					</Stack>,
					<CustomLink to="/admin/googleAd/page/edit/$id" color="inherit" underline="none" params={{ id: item.id.toString() }} key={item.id}>
						编辑
					</CustomLink>,
				];
			})
		: [];

	return (
		<>
			<PageTitle title={"Google广告页面"} sub_header={<AddButton />} />
			{query.isFetching ? (
				<Stack direction={"column"} spacing={0}>
					{Array.from({ length: 8 }).map((_, index) => (
						<Skeleton key={index.toString()} width={900} height={60} animation="wave" />
					))}
				</Stack>
			) : (
				<Grid size={12}>
					<CustomTable header={table_headers} body={table_body} />
				</Grid>
			)}
		</>
	);
}

const AddButton = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ["newGoogleAdPage"],
		mutationFn: async () => await supabase.from("googleAdPage").insert({}).select("*").single(),
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["googleAdPageList"] });
		},
	});

	return (
		<Button
			onClick={async () => {
				mutation.mutate();
			}}
			disabled={mutation.isPending}
			startIcon={<AddOutlinedIcon />}
		>
			新建广告页面
		</Button>
	);
};
