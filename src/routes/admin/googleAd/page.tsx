import { PageTitle } from "@/page_component/page_title";
import { CusTable } from "@/page_component/table";
import { supabase } from "@/supabase";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Grid, Paper } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/googleAd/page")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();

	// 获取所有页面
	const { data } = useQuery({
		queryKey: ["googleAdPage"],
		queryFn: async () => {
			return await supabase.from("googleAdPage").select("id,title").order("id", { ascending: true });
		},
	});

	// 新建页面
	const mutation = useMutation({
		mutationFn: async () => {
			await supabase.from("googleAdPage").insert({ title: "new page" });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["googleAdPage"] });
		},
	});

	return (
		<>
			<PageTitle
				title="谷歌广告页面"
				subheader={
					<Button
						onClick={() => {
							mutation.mutate();
						}}
						startIcon={<AddOutlinedIcon />}
						disabled={mutation.status === "pending"}
					>
						{mutation.status === "pending" ? "添加中..." : "添加页面"}
					</Button>
				}
			/>

			<Grid size={12}>
				<Paper>
					<CusTable
						tableHeader={["title", "action"]}
						tableBody={
							data?.data?.map((item) => [
								item.title || "",

								<Button key="edit" variant="text" color="inherit">
									edit
								</Button>,
							]) || []
						}
					/>
				</Paper>
			</Grid>
		</>
	);
}
