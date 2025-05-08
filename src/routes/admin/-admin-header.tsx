import { CustomLink } from "@/component/MuiLink";
import { supabase } from "@/supabase";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const AdminHeader = (props: { email: string }) => {
	const navigate = useNavigate();
	return (
		<AppBar position="static" variant="outlined" color="inherit">
			<Toolbar>
				<Stack flexGrow={1}>
					<Box>
						<CustomLink to={"/admin"} color="inherit" underline="none">
							<Typography>ChinaSilkTravel</Typography>
						</CustomLink>
					</Box>
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
