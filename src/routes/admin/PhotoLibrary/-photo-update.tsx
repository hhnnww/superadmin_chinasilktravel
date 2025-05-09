import { supabase } from "@/supabase";
import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import shortUUID from "short-uuid";
import { useImmer } from "use-immer";

interface FileUpdateEvent extends React.ChangeEvent<HTMLInputElement> {
	target: HTMLInputElement & EventTarget;
}

export const PhotoUpdate = () => {
	const [upState, setUpState] = useImmer({
		current: 0,
		total: 0,
		current_name: "",
	});

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async (files: File[]) => {
			if (!files || files.length === 0) return;
			setUpState((draft) => {
				draft.total = files.length;
			});
			for (const file of files) {
				const uniqueFileNames = `${shortUUID().generate()}.jpg`;
				setUpState((draft) => {
					draft.current += 1;
					draft.current_name = uniqueFileNames;
				});
				await supabase.storage
					.from(import.meta.env.VITE_STORAGE)
					.upload(`public/${uniqueFileNames}`, file);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["photos", 1],
			});
		},
	});

	const fileUpdateHandler = (event: FileUpdateEvent): void => {
		mutation.mutateAsync(event.target.files as unknown as File[]).then(() => {
			event.target.value = "";
		});
	};

	return (
		<>
			<Grid size={12}>
				{mutation.isPending && (
					<Stack>
						<Box sx={{ width: "100%" }}>
							<LinearProgress
								variant="determinate"
								value={(upState.current / upState.total) * 100}
							/>
						</Box>
						<Box mt={2}>
							<Typography>{`图片正在上传中 ${upState.current}/${upState.total} ${upState.current_name}`}</Typography>
						</Box>
					</Stack>
				)}
				<Box mt={2}>
					<input
						type="file"
						accept="image/*"
						multiple
						onChange={fileUpdateHandler}
					/>
				</Box>
			</Grid>
		</>
	);
};
