import { PageTitle } from "@/component/PageTitle";
import { supabase } from "@/supabase";
import HomeMaxOutlinedIcon from "@mui/icons-material/HomeMaxOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useImmer } from "use-immer";
import { PhotoIitem } from "./-photo-item";
import { PhotoUpdate } from "./-photo-update";
export const Route = createFileRoute("/admin/PhotoLibrary/list")({
	component: RouteComponent,
});

function RouteComponent() {
	const [photoPage, setPhotoPage] = useImmer(1);

	const query = useQuery({
		queryKey: ["photos", photoPage],

		queryFn: async () => {
			const limit = 12;
			return await supabase.storage
				.from(import.meta.env.VITE_STORAGE)
				.list("public", {
					limit: limit,
					offset: (photoPage - 1) * limit,
					sortBy: { column: "created_at", order: "desc" },
				});
		},

		placeholderData: keepPreviousData,
	});
	const PageNavi = () => (
		<Grid size={12}>
			<ButtonGroup variant="contained">
				{photoPage > 1 && (
					<Button
						startIcon={<HomeMaxOutlinedIcon />}
						onClick={() => setPhotoPage(1)}
					>
						home
					</Button>
				)}
				{photoPage > 1 && (
					<Button
						startIcon={<KeyboardDoubleArrowLeftOutlinedIcon />}
						onClick={() => setPhotoPage(photoPage - 1)}
					>
						prev
					</Button>
				)}
				<Button>{photoPage}</Button>
				<Button
					endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
					onClick={() => setPhotoPage(photoPage + 1)}
				>
					next
				</Button>
			</ButtonGroup>
		</Grid>
	);
	return (
		<>
			<PageTitle title="Photo Library" />
			<PhotoUpdate />
			<PageNavi />

			<Grid size={12}>
				<Grid container spacing={2}>
					{query.data?.data?.map(
						(item) =>
							item.name !== ".emptyFolderPlaceholder" && (
								<PhotoIitem {...item} key={item.id} />
							),
					)}
				</Grid>
			</Grid>

			<PageNavi />
		</>
	);
}
