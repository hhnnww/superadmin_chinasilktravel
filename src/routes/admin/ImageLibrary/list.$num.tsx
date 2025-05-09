import { CustomButtonLink } from "@/component/ButtonLink";
import { PageTitle } from "@/component/PageTitle";
import { supabase } from "@/supabase";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { Button, ButtonGroup, Grid, ImageList, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { ImageItem } from "./-image-item";
import { UpdateImage } from "./-update-image";

export const Route = createFileRoute("/admin/ImageLibrary/list/$num")({
	component: RouteComponent,
	loader: async ({ params }) => {
		const limit = 20;
		const offset = (Number(params.num) - 1) * limit;

		return supabase.storage.from(import.meta.env.VITE_STORAGE).list("public", {
			limit: limit,
			offset: offset,
			sortBy: { column: "created_at", order: "desc" },
		});
	},
});

function RouteComponent() {
	const params = Route.useParams();
	const query = Route.useLoaderData();

	return (
		<>
			<PageTitle title="Image Library" sub_header={<UpdateImage />} />

			<Grid size={12}>
				<ImageList cols={4} gap={20} sx={{ maxWidth: "100%" }}>
					{(query?.data || []).map((item) => (
						<ImageItem key={item.name} name={item.name} />
					))}
				</ImageList>
			</Grid>

			<Grid size={12}>
				<Stack direction={"row"} spacing={1}>
					{Number(params.num) > 1 && (
						<CustomButtonLink
							to={"/admin/ImageLibrary/list/$num"}
							params={{ num: "1" }}
						>
							Home
						</CustomButtonLink>
					)}
					<ButtonGroup variant="contained">
						{Number(params.num) > 1 && (
							<CustomButtonLink
								startIcon={<KeyboardDoubleArrowLeftOutlinedIcon />}
								to={"/admin/ImageLibrary/list/$num"}
								params={{ num: (Number(params.num) - 1).toString() }}
							>
								{Number(params.num) - 1} PrevPage
							</CustomButtonLink>
						)}
						<Button>{params.num}</Button>
						<CustomButtonLink
							endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
							to={"/admin/ImageLibrary/list/$num"}
							params={{ num: (Number(params.num) + 1).toString() }}
						>
							NextPage {Number(params.num) + 1}
						</CustomButtonLink>
					</ButtonGroup>
				</Stack>
			</Grid>
		</>
	);
}
