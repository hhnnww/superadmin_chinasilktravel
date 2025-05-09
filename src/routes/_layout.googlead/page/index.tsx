import { PageTitle } from "@/component/PageTitle";
import { supabase } from "@/supabase";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LayoutPageItem } from "./-page-item";
export const Route = createFileRoute("/_layout/googlead/page/")({
	component: RouteComponent,
});

function RouteComponent() {
	const query = useQuery({
		queryKey: ["googleadpage"],
		queryFn: async () =>
			await supabase
				.from("googleAdPage")
				.select("*")
				.is("parnet_id", null)
				.order("id"),
	});

	const mutation = useMutation({
		mutationFn: async () =>
			await supabase.from("googleAdPage").insert({ title: "test" }),
		onSuccess: () => {
			query.refetch();
		},
	});

	return (
		<>
			<PageTitle
				title="GoogleAdPage"
				sub_header={
					<Button
						onClick={async () => await mutation.mutateAsync()}
						startIcon={<AddOutlinedIcon />}
					>
						Add GoogleAdPage
					</Button>
				}
			/>

			{query.data?.data?.map((item) => (
				<LayoutPageItem key={item.id.toString()} {...item} />
			))}
		</>
	);
}
