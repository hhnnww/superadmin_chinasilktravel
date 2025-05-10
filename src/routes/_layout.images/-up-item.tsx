import { supabaseStroga } from "@/supabase";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";
import { numbers } from "nanoid-dictionary";
import { useImmer } from "use-immer";

export const UpItem = () => {
	const [upState, setUpState] = useImmer({
		current: 0,
		total: 0,
		name: "",
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (files: FileList | null) => {
			if (!files) return;
			setUpState((draft) => {
				draft.total = files.length;
			});

			for (const file of files) {
				setUpState((draft) => {
					draft.current += 1;
					draft.name = file.name;
				});
				const nano = customAlphabet(lowercase + numbers, 10);
				const new_name = `${nano().toString()}.jpg`;
				await supabaseStroga.update(new_name, file);
			}

			setUpState((draft) => {
				draft.total = 0;
				draft.current = 0;
				draft.name = "";
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["images", 1] });
		},
	});

	return (
		<>
			<Button
				startIcon={<AddPhotoAlternateOutlinedIcon />}
				component={"label"}
				htmlFor="file-upload"
				loading={mutation.isPending}
			>
				update images
			</Button>

			<input
				id="file-upload"
				type="file"
				multiple
				onChange={(e) => {
					mutation.mutateAsync(e.target.files).then(() => {
						e.target.value = "";
					});
				}}
				style={{ display: "none" }}
			/>

			{upState.total > 0 && (
				<Box sx={{ width: "100%", mt: 4 }}>
					<Typography>{`正在上传:${upState.name} ${upState.current} / ${upState.total}`}</Typography>
					<LinearProgress
						variant="determinate"
						value={(upState.current / upState.total) * 100}
					/>
				</Box>
			)}
		</>
	);
};
