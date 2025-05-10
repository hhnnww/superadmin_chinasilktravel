import { Button, ButtonGroup, Grid } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import HomeMiniOutlinedIcon from "@mui/icons-material/HomeMiniOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

import { PageTitle } from "@/component/PageTitle";
import { supabaseStroga } from "@/supabase";

import { PhotoItem } from "./-photo-item";
import { UpItem } from "./-up-item";

export const Route = createFileRoute("/_layout/images/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [page, setPage] = useState(1);
	const limit = 16;
	const offset = (page - 1) * limit;

	// 获取图片列表
	const query = useQuery({
		queryKey: ["images", page],
		queryFn: async () =>
			await supabaseStroga.list("", { limit: limit, offset: offset }),
		placeholderData: keepPreviousData,
	});

	// 图片导航
	const ImageNavi = () => (
		<Grid size={12}>
			<ButtonGroup variant="contained">
				{page > 1 && (
					<Button
						startIcon={<HomeMiniOutlinedIcon />}
						onClick={() => setPage(1)}
					>
						home
					</Button>
				)}
				{page > 1 && (
					<Button
						startIcon={<KeyboardDoubleArrowLeftOutlinedIcon />}
						onClick={() => setPage(page - 1)}
					>
						prev
					</Button>
				)}
				<Button>{page}</Button>
				<Button
					endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
					onClick={() => setPage(page + 1)}
				>
					next
				</Button>
			</ButtonGroup>
		</Grid>
	);

	return (
		<>
			<PageTitle title="Images" sub_header={<UpItem />} />
			<ImageNavi />
			<Grid size={12}>
				<Grid container spacing={2}>
					{query.data?.data?.map((item) => (
						<PhotoItem name={item.name} key={item.name} />
					))}
				</Grid>
			</Grid>
			<ImageNavi />
		</>
	);
}
