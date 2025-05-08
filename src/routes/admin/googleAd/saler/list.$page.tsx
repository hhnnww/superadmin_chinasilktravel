import { CustomLink } from "@/component/MuiLink";
import { PageTitle } from "@/component/PageTitle";
import { CustomTable } from "@/component/Table";
import { supabase } from "@/supabase";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Chip } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/googleAd/saler/list/$page")({
	component: RouteComponent,
});

function RouteComponent() {
	const query = useQuery({
		queryKey: ["googleAdSalerList"],
		queryFn: async () => await supabase.from("googleAdSaler").select("*").order("created_at"),
	});

	const MutationSetActive = useMutation({
		mutationFn: async ({ data }: { data: { id: number; active: boolean } }) => await supabase.from("googleAdSaler").update({ active: !data.active }).eq("id", data.id),
		onSuccess: async () => {
			query.refetch();
		},
	});

	const table_header = ["name", "views", "active", "action"];
	const table_body =
		query.data?.data?.map((item) => {
			return [
				`${item.name} (${item.ori_name})`,
				item.views,
				item.active ? (
					<Chip label="启用中" color="success" key={item.id.toString()} onClick={() => MutationSetActive.mutate({ data: { id: item.id, active: item.active || false } })} />
				) : (
					<Chip onClick={() => MutationSetActive.mutate({ data: { id: item.id, active: item.active || false } })} label="停用中" color="default" key={item.id.toString()} />
				),
				<CustomLink to="/admin/googleAd/saler/edit/$id" params={{ id: item.id.toString() }} key={item.id.toString()} color="inherit" underline="none">
					edit
				</CustomLink>,
			];
		}) || [];

	return (
		<>
			<PageTitle title="GoogleAdSaler" sub_header={<AddSalerButton />} />
			{query?.data?.data && <CustomTable header={table_header} body={table_body} />}
		</>
	);
}

const AddSalerButton = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () => await supabase.from("googleAdSaler").insert({}).select("*").single(),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["googleAdSalerList"] });
		},
	});

	return (
		<Button startIcon={<AddOutlinedIcon />} onClick={async () => mutation.mutate()}>
			Add Google Saler
		</Button>
	);
};
