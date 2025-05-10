import { Button, Grid, Paper, Stack } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";

import { supabaseStroga } from "@/supabase";

export const PhotoItem = (props: { name: string }) => {
	// 获取缩略图
	const query = useQuery({
		queryKey: ["photo", props.name],
		queryFn: async () =>
			supabaseStroga.getPublicUrl(props.name, {
				transform: {
					width: 200,
					height: 200,
					quality: 30,
				},
			}),
	});
	const queryClient = useQueryClient();
	// 删除图片
	const mutationDelete = useMutation({
		mutationFn: async () => {
			if (confirm("删除后无法恢复，确定要删除吗")) {
				await supabaseStroga.remove([props.name]);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["images", 1],
			});
		},
	});

	return (
		<>
			<Grid size={3}>
				<Paper>
					<Stack spacing={2}>
						<img
							style={{ width: "100%", minHeight: 200 }}
							src={query.data?.data.publicUrl}
							alt={props.name}
						/>
						<Stack direction={"column"} alignItems={"start"} px={2} pb={2}>
							<Button
								size="small"
								variant="text"
								color="inherit"
								startIcon={<AutoFixHighOutlinedIcon />}
								onClick={() => {
									navigator.clipboard
										.writeText(
											supabaseStroga.getPublicUrl(props.name, {
												transform: {
													width: 800,
													quality: 30,
													resize: "contain",
													format: "origin",
												},
											}).data.publicUrl || "",
										)
										.then(() => {
											alert("copy url success");
										});
								}}
							>
								copy url
							</Button>
							<Button
								size="small"
								variant="text"
								color="inherit"
								startIcon={<AutoFixHighOutlinedIcon />}
								onClick={() => {
									navigator.clipboard
										.writeText(
											`![${props.name}](${
												supabaseStroga.getPublicUrl(props.name, {
													transform: {
														width: 800,
														quality: 30,
														resize: "contain",
														format: "origin",
													},
												}).data.publicUrl || ""
											})`,
										)
										.then(() => {
											alert("copy markdown success");
										});
								}}
							>
								copy markdown
							</Button>
							<Button
								size="small"
								variant="text"
								color="error"
								startIcon={<BookmarkRemoveOutlinedIcon />}
								onClick={async () => {
									await mutationDelete.mutateAsync();
								}}
								loading={mutationDelete.isPending}
							>
								delete
							</Button>
						</Stack>
					</Stack>
				</Paper>
			</Grid>
		</>
	);
};
