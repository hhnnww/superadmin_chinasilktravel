import { PageTitle } from "@/page_component/page_title";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/googleAd/saler")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<PageTitle title="谷歌广告销售" subheader={<Button startIcon={<AddOutlinedIcon />}>添加销售</Button>} />
		</>
	);
}
