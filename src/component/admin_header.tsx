import { supabase } from "@/supabase";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const AdminHeader = (props: { email: string }) => {
	return (
		<AppBar color="inherit" position="sticky" elevation={0}>
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>
					<Typography>ChinaSilkTravel</Typography>
				</Box>
				<Stack direction={"row"} alignItems={"center"} spacing={2}>
					<Typography>{props.email}</Typography>
					<LogoutButton />
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

const LogoutButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => {
				supabase.auth.signOut().then(() => {
					navigate({ to: "/login" });
				});
			}}
			variant="text"
			color="inherit"
			sx={{
				":hover": {
					backgroundColor: "inherit",
				},
			}}
		>
			logout
		</Button>
	);
};
