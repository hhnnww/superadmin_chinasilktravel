import { Box, Grid, Stack, Typography } from "@mui/material";
import type { ReactNode } from "@tanstack/react-router";

export const PageTitle = (props: { title: string; subheader?: ReactNode; right_action?: ReactNode }) => {
	return (
		<Grid size={12} pb={4}>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<Stack alignItems={"start"}>
					<Box>
						<Typography variant="h6">{props.title}</Typography>
					</Box>
					<Box mt={2}>{props.subheader && props.subheader}</Box>
				</Stack>
				<Box>{props.right_action && props.right_action}</Box>
			</Stack>
		</Grid>
	);
};
