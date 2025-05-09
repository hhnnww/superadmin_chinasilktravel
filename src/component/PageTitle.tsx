import { Grid, Typography } from "@mui/material";
import type { ReactNode } from "@tanstack/react-router";

export const PageTitle = (props: { title: string; sub_header?: ReactNode }) => {
	return (
		<>
			<Grid size={12}>
				<Typography
					variant="h2"
					sx={{ mb: 2, fontSize: "2.4rem", fontWeight: 500 }}
				>
					{props.title}
				</Typography>
				{props?.sub_header && <>{props.sub_header}</>}
			</Grid>
		</>
	);
};
