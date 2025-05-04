import { PageTitle } from "@/page_component/page_title";
import { CusTable } from "@/page_component/table";
import { supabase } from "@/supabase";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Grid, Paper } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/googleAd/saler")({
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	// 获取所有销售
	const { data } = useQuery({
		queryKey: ["googleAdSaler"],
		queryFn: async () => {
			return await supabase.from("googleAdSaler").select("*").order("id", { ascending: true });
		},
	});
	// 新建销售
	const addSalermutation = useMutation({
		mutationFn: async () => {
			await supabase.from("googleAdSaler").insert({ name: "new saler", email: "", phone: "" });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["googleAdSaler"] });
		},
	});
	return (
		<>
			<PageTitle
				title="谷歌广告销售"
				subheader={
					<Button
						onClick={() => {
							addSalermutation.mutate();
						}}
						startIcon={<AddOutlinedIcon />}
						disabled={addSalermutation.status === "pending"}
					>
						{addSalermutation.status === "pending" ? "添加中..." : "添加销售"}
					</Button>
				}
			/>

			<Grid size={12}>
				<Paper>
					<CusTable tableHeader={["name", "email", "phone", "action"]} tableBody={data?.data?.map((item) => [item.name || "", item.email || "", item.phone || "", "edit"]) || []} />
				</Paper>
			</Grid>
		</>
	);
}
