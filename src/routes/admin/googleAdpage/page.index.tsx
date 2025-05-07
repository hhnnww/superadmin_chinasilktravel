import { CustomLink } from "@/component/MuiLink";
import { PageTitle } from "@/component/PageTitle";
import { CustomTable } from "@/component/Table";
import { supabase } from "@/supabase";
import { Button, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { produce } from "immer";

export const Route = createFileRoute("/admin/googleAdpage/page/")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();

	// 获取所有page
	const query = useQuery({
		queryKey: ["googleAdPages"],
		queryFn: async () => await supabase.from("googleAdPage").select("id,title").is("parnet_id", null).order("id"),
	});

	// 新增一个page
	const mutation = useMutation({
		mutationFn: async () => await supabase.from("googleAdPage").insert({}).select("id,title").single(),
		onSuccess: ({ data }) => {
			queryClient.setQueryData(["googleAdPages"], (oldData: typeof query.data) =>
				produce(oldData, (draft) => {
					if (data) {
						draft?.data?.push(data);
					}
				}),
			);
		},
	});

	// 构建表格
	const table_header = ["title", "action"];
	const table_body =
		query.data?.data?.map((item) => [
			item.title,
			<CustomLink underline={"none"} color="inherit" to={"/admin/googleAdpage/page/$id"} params={{ id: item.id.toString() }} key={item.id}>
				edit
			</CustomLink>,
		]) || [];

	return (
		<>
			<PageTitle
				title="GoogleAdPage"
				sub_header={
					<Button onClick={() => mutation.mutate()} disabled={query.isFetching || mutation.isPending}>
						Add New Page
					</Button>
				}
			/>
			<Grid size={12}>
				<CustomTable header={table_header} body={table_body} />
			</Grid>
		</>
	);
}
