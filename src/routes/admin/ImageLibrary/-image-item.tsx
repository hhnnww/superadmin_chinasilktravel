import { supabase } from "@/supabase";
import { Button, ButtonGroup, ImageListItem, ImageListItemBar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export const ImageItem = (props: { name: string }) => {
	const query = useQuery({
		queryKey: ["ImageLibrarySingle", props.name],
		queryFn: async () => {
			return supabase.storage.from(import.meta.env.VITE_STORAGE).getPublicUrl(`public/${props.name}`, {
				transform: {
					width: 200,
					height: 200,
					quality: 30,
				},
			});
		},
	});
	const oriImageQuery = useQuery({
		queryKey: ["ImageLibrarySingleOri", props.name],
		queryFn: async () => {
			return supabase.storage.from(import.meta.env.VITE_STORAGE).getPublicUrl(`public/${props.name}`, {
				transform: {
					width: 800,
					quality: 60,
					resize: "contain",
				},
			});
		},
	});
	const markdown_text = `![${props.name}](${oriImageQuery.data?.data.publicUrl})`;
	const ori_url = oriImageQuery.data?.data.publicUrl || "";
	return (
		<>
			{props.name !== ".emptyFolderPlaceholder" && (
				<ImageListItem sx={{ mb: 8 }}>
					<img src={query.data?.data.publicUrl} alt={props.name} loading="lazy" style={{ maxWidth: "100%" }} />
					<ImageListItemBar
						sx={{ mt: 2 }}
						position="below"
						subtitle={
							<ButtonGroup variant="contained" size="small" sx={{ mt: 2 }}>
								<Button
									onClick={async () => {
										await navigator.clipboard.writeText(ori_url);
										alert("复制图片链接到剪贴板成功");
									}}
								>
									copy url
								</Button>
								<Button
									onClick={async () => {
										await navigator.clipboard.writeText(markdown_text);
										alert("复制markdown到剪贴板成功");
									}}
								>
									copy markdown
								</Button>
							</ButtonGroup>
						}
					/>
				</ImageListItem>
			)}
		</>
	);
};
