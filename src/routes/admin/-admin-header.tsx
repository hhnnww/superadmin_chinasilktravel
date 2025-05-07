import { supabase } from "@/supabase";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const AdminHeader = (props: { email: string }) => {
	const navigate = useNavigate();
	return (
		<AppBar position="static" variant="outlined" color="inherit">
			<Toolbar>
				<Stack flexGrow={1}>
					<Typography>ChinaSilkTravel</Typography>
				</Stack>
				<Stack direction={"row"} spacing={2} alignItems={"center"}>
					<Typography>{props.email}</Typography>
					<Button
						color="inherit"
						variant={"text"}
						onClick={async () => {
							await supabase.auth.signOut();
							navigate({ to: "/login" });
						}}
					>
						Logout
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
