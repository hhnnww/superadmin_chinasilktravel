import { supabase } from "@/supabase";
import { Button, Card, CardActions, CardMedia, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PhotoIitem = (props: {
	name: string;
}) => {
	const querySmallImageUrl = useQuery({
		queryKey: ["imageUrl", "small", props.name],
		queryFn: async () =>
			supabase.storage
				.from(import.meta.env.VITE_STORAGE)
				.getPublicUrl(`public/${props.name}`, {
					transform: {
						width: 200,
						quality: 30,
						resize: "contain",
					},
				}).data.publicUrl,
	});

	const queryLargeImageUrl = useQuery({
		queryKey: ["imageUrl", "large", props.name],
		queryFn: async () =>
			supabase.storage
				.from(import.meta.env.VITE_STORAGE)
				.getPublicUrl(`public/${props.name}`, {
					transform: {
						width: 800,
						quality: 60,
						resize: "contain",
					},
				}).data.publicUrl,
	});
	const queryClient = useQueryClient();
	const mutationDelete = useMutation({
		mutationFn: async () => {
			if (confirm("Are you sure you want to delete this image?")) {
				await supabase.storage
					.from(import.meta.env.VITE_STORAGE)
					.remove([`public/${props.name}`]);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["photos", 1],
			});
		},
	});

	const copyText = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			alert("copied to clipboard");
		});
	};
	return (
		<>
			<Grid size={4}>
				<Card>
					<CardMedia
						component={"img"}
						image={querySmallImageUrl.data}
						title={props.name}
						height={300}
					/>
					<CardActions>
						<Button
							size="small"
							onClick={() => {
								copyText(`${queryLargeImageUrl.data}`);
							}}
						>
							copy url
						</Button>
						<Button
							size="small"
							onClick={() => {
								copyText(`![${props.name}](${queryLargeImageUrl.data})`);
							}}
						>
							copy markdown
						</Button>

						<Button
							size="small"
							onClick={() => {
								mutationDelete.mutate();
							}}
							color="error"
						>
							delete
						</Button>
					</CardActions>
				</Card>
			</Grid>
		</>
	);
};
