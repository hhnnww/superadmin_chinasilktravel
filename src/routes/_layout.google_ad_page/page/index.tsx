import { Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { PageTitle } from "@/component/PageTitle";
import { supabaseClient } from "@/supabase";

import { GoogleAdPageItem } from "./-page-item";
export const Route = createFileRoute("/_layout/google_ad_page/page/")({
	component: RouteComponent,
});

function RouteComponent() {
	// 新建一个GoogleAdPage
	const mutation = useMutation({
		mutationFn: async () =>
			await supabaseClient.from("googleAdPage").insert({}),
		onSuccess: () => query.refetch(),
	});

	// 获取所有的GoogleAdPage
	const query = useQuery({
		queryKey: ["googleAdPages"],
		queryFn: async () =>
			await supabaseClient
				.from("googleAdPage")
				.select("*")
				.is("parnet_id", null)
				.order("id"),
	});

	return (
		<>
			<PageTitle
				title="GoogleAdPage"
				sub_header={
					<Button
						onClick={async () => mutation.mutateAsync()}
						startIcon={<AddOutlinedIcon />}
						loading={mutation.isPending}
					>
						Add Page
					</Button>
				}
			/>
			{query.data?.data?.map((item) => (
				<GoogleAdPageItem {...item} key={item.id.toString()} />
			))}
		</>
	);
}
