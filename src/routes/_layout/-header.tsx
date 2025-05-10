import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";

import { CustomLink } from "@/component/MuiLink";
import { supabaseClient } from "@/supabase";
export const Header = (props: { email: string }) => {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: async () => {
			await supabaseClient.auth.signOut();
			navigate({ to: "/login" });
		},
	});

	return (
		<AppBar position="fixed">
			<Toolbar>
				<Stack sx={{ flexGrow: 1 }}>
					<Stack direction={"row"} alignItems={"center"} spacing={1}>
						<BlurOnOutlinedIcon />
						<CustomLink
							to="/"
							sx={{ fontWeight: 700 }}
							color="inherit"
							underline="none"
						>
							ChinaSilkTravel
						</CustomLink>
					</Stack>
				</Stack>
				<Stack direction={"row"} alignItems={"center"} spacing={2}>
					<Typography>{props.email}</Typography>
					<Button
						variant="text"
						color="inherit"
						onClick={() => mutation.mutateAsync()}
						loading={mutation.isPending}
					>
						Logout
					</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
