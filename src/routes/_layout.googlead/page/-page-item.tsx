import { CustomButtonLink } from "@/component/ButtonLink";
import { supabase } from "@/supabase";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { Database } from "database.types";
import dayjs from "dayjs";
export const LayoutPageItem = (
	props: Database["public"]["Tables"]["googleAdPage"]["Row"],
) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () =>
			await supabase.from("googleAdPage").delete().eq("id", props.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["googleadpage"],
			});
		},
	});
	return (
		<Grid size={12}>
			<Card>
				<CardHeader
					title={props.title}
					subheader={
						<Typography variant="body2" color="text.secondary">
							{`创建时间: ${dayjs(props.created_at).format("YYYY-MM-DD")}`}
						</Typography>
					}
				/>
				<CardContent>
					<Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
						{props.content}
					</Typography>
				</CardContent>
				<CardActions>
					<CustomButtonLink
						component={Link}
						to={"/googlead/page/edit/$id"}
						params={{ id: props.id.toString() }}
						variant="text"
						color="inherit"
						startIcon={<CreateOutlinedIcon />}
					>
						Edit
					</CustomButtonLink>
					<Button
						variant="text"
						color="error"
						onClick={async () => {
							if (confirm("Are you sure you want to delete this page?")) {
								await mutation.mutateAsync();
							}
						}}
						startIcon={<DeleteOutlineOutlinedIcon />}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};
