import { CustomButtonLink } from "@/component/ButtonLink";
import { supabaseClient } from "@/supabase";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Database } from "database.types";
import dayjs from "dayjs";

export const GoogleAdPageItem = (
	props: Database["public"]["Tables"]["googleAdPage"]["Row"],
) => {
	const queryClient = useQueryClient();
	const mutationDelete = useMutation({
		mutationFn: async () =>
			await supabaseClient.from("googleAdPage").delete().eq("id", props.id),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["googleAdPages"] }),
	});
	return (
		<>
			<Grid size={12}>
				<Card>
					<CardHeader
						title={props.title || "无标题文档"}
						subheader={
							<Typography
								variant="body2"
								sx={{ mt: 1, textTransform: "uppercase" }}
							>
								{`Created_at: ${dayjs(props.created_at).format("YYYY-MM-DD")}`}
							</Typography>
						}
					/>
					<CardContent sx={{ maxHeight: "200px", overflow: "hidden" }}>
						{props.content || "无内容"}
					</CardContent>
					<CardActions>
						<Stack flexGrow={1}>
							<Box>
								<CustomButtonLink
									variant="text"
									to="/google_ad_page/page/edit/$id"
									params={{ id: props.id.toString() }}
									startIcon={<ModeEditOutlinedIcon />}
								>
									edit
								</CustomButtonLink>
							</Box>
						</Stack>
						<Button
							variant="text"
							color="error"
							onClick={async () => {
								if (confirm("确定要删除吗，这个操作无法恢复。")) {
									mutationDelete.mutateAsync();
								}
							}}
							loading={mutationDelete.isPending}
						>
							delete
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</>
	);
};
