import { CustomLink } from "@/component/MuiLink";
import { supabase } from "@/supabase";
import { AppBar, Box, Button, Divider, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const AdminHeader = (props: { email: string }) => {
	const navigate = useNavigate();
	return (
		<>
			<AppBar position="static" color="inherit" elevation={0}>
				<Toolbar>
					<Stack sx={{ flexGrow: 1 }}>
						<Box>
							<CustomLink to={"/admin"} color="inherit" underline="none" sx={{ fontWeight: "bold" }}>
								ChinaSilkTravel
							</CustomLink>
						</Box>
					</Stack>
					<Stack direction={"row"} alignItems={"center"} spacing={2}>
						<Box>{props.email}</Box>
						<Box>
							<Button
								variant="text"
								color="inherit"
								onClick={() => {
									supabase.auth.signOut().then(() => {
										navigate({ to: "/login" });
									});
								}}
							>
								logout
							</Button>
						</Box>
					</Stack>
				</Toolbar>
			</AppBar>
			<Divider />
		</>
	);
};
