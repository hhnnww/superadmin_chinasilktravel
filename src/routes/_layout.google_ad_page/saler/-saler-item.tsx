import { CustomButtonLink } from "@/component/ButtonLink";
import { supabaseClient } from "@/supabase";
import {
	Button,
	Grid,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Database } from "database.types";

export const SalerItem = (
	props: Database["public"]["Tables"]["googleAdSaler"]["Row"],
) => {
	const queryClient = useQueryClient();

	const mutataionDelete = useMutation({
		mutationFn: async () =>
			await supabaseClient.from("googleAdSaler").delete().eq("id", props.id),

		onSuccess: ({ data }) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["googlead", "saler", "list"],
			});
		},
	});
	return (
		<>
			<Grid size={12}>
				<Paper>
					<List>
						{Object.entries(props).map(
							([key, value]) =>
								["id", "created_at"].indexOf(key) === -1 && (
									<ListItem key={key}>
										<ListItemText>
											{key}: {value}
										</ListItemText>
									</ListItem>
								),
						)}

						<ListItem>
							<Stack direction={"row"} spacing={1}>
								<CustomButtonLink
									to={"/google_ad_page/saler/edit/$id"}
									params={{ id: props.id.toString() }}
									variant="text"
								>
									Edit
								</CustomButtonLink>
								<Button
									variant="text"
									color="error"
									onClick={async () => {
										if (confirm("Are you sure you want to delete this item?")) {
											await mutataionDelete.mutateAsync();
										}
									}}
								>
									Delete
								</Button>
							</Stack>
						</ListItem>
					</List>
				</Paper>
			</Grid>
		</>
	);
};
