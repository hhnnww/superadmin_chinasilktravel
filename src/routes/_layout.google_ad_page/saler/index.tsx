import { PageTitle } from "@/component/PageTitle";
import { supabaseClient } from "@/supabase";
import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { SalerItem } from "./-saler-item";

export const Route = createFileRoute("/_layout/google_ad_page/saler/")({
	component: RouteComponent,
});

function RouteComponent() {
	const query = useQuery({
		queryKey: ["googlead", "saler", "list"],
		queryFn: async () =>
			await supabaseClient.from("googleAdSaler").select("*").order("id"),
	});
	return (
		<>
			<PageTitle title="GoogleAdSaler" sub_header={<AddSalerButton />} />
			{query.data?.data?.map((item) => (
				<SalerItem {...item} key={item.id.toString()} />
			))}
		</>
	);
}

const AddSalerButton = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () =>
			await supabaseClient.from("googleAdSaler").insert({}),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: ["googlead", "saler", "list"],
			}),
	});
	return (
		<Button
			onClick={async () => await mutation.mutateAsync()}
			loading={mutation.isPending}
		>
			Add Saler
		</Button>
	);
};
