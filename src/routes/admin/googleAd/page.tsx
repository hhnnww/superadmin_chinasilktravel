import { PageTitle } from "@/page_component/page_title";
import { CusTable } from "@/page_component/table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, Grid, Paper } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/googleAd/page")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<PageTitle title="谷歌广告页面" subheader={<Button startIcon={<AddOutlinedIcon />}>新建页面</Button>} />

			<Grid size={12}>
				<Paper>
					<CusTable
						tableHeader={["id", "title", "state", "action"]}
						tableBody={[
							["12", "saldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajksaldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
							["12", "saldjfklasjdlfklajk", "false", "edit"],
						]}
					/>
				</Paper>
			</Grid>
		</>
	);
}
