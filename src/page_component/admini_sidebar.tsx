import { supabase } from "@/supabase";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import { Box, Button, ListItemIcon, ListItemText, MenuItem, MenuList, Stack, type SxProps, Typography, alpha } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";

export const AdminSidebar = (props: { email: string }) => {
	const menu_list = [
		{
			title: "在线询单",
			menus: [{ name: "所有询单", icon: <LocalAtmOutlinedIcon />, link: "/admin/advice" }],
		},
		{
			title: "旅游产品",
			menus: [
				{ name: "所有产品", icon: <AirplaneTicketOutlinedIcon />, link: "/admin/travelproduct/product" },
				{ name: "目的地", icon: <ExploreOutlinedIcon />, link: "/admin/travelproduct/site" },
			],
		},
		{
			title: "旅游攻略",
			menus: [{ name: "旅游攻略", icon: <NewspaperOutlinedIcon />, link: "/admin/guide/" }],
		},
		{
			title: "旅游问答",
			menus: [{ name: "问答", icon: <QuestionAnswerOutlinedIcon />, link: "/admin/ask/" }],
		},
		{
			title: "谷歌广告页面",
			menus: [
				{ name: "页面", icon: <WebOutlinedIcon />, link: "/admin/googleAd/page" },
				{ name: "销售", icon: <ContactPhoneOutlinedIcon />, link: "/admin/googleAd/saler" },
			],
		},
	];
	return (
		<>
			<SidebarLogo email={props.email} />
			{menu_list.map((menu) => {
				return (
					<MenuList sx={{ padding: 0, mb: 3 }} key={menu.title}>
						<SidebarMenuTitle title={menu.title} />
						{menu.menus.map((item) => {
							return <SidebarMenuIten key={item.name} to={item.link} icon={item.icon} text={item.name} />;
						})}
					</MenuList>
				);
			})}
		</>
	);
};
const SidebarLogo = (props: { email: string }) => {
	const navigate = useNavigate();

	return (
		<Box px={2} py={3}>
			<Typography sx={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }} component={Link} to="/admin">
				ChinaSilkTravel
			</Typography>

			<Stack direction={"row"} spacing={1} alignItems={"center"} sx={{ textTransform: "uppercase" }}>
				<Typography variant="body2" sx={{ color: alpha("#fff", 0.6) }}>
					{props.email}
				</Typography>
				<Button
					size="small"
					variant="text"
					color="inherit"
					onClick={async () => {
						const { error } = await supabase.auth.signOut();
						if (error) {
							console.log(error);
						} else {
							return navigate({ to: "/login" });
						}
					}}
					sx={{
						color: alpha("#fff", 0.6),
						":hover": {
							color: "#ffff",
						},
					}}
					startIcon={<InputOutlinedIcon />}
				>
					logout
				</Button>
			</Stack>
		</Box>
	);
};

const SidebarMenuTitle = (props: { title: string }) => {
	return (
		<MenuItem disabled>
			<ListItemText>
				<Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>{props.title}</Typography>
			</ListItemText>
		</MenuItem>
	);
};

const sidebarsx: SxProps = {
	py: 1,
	color: alpha("#fff", 0.5),
	svg: {
		color: alpha("#fff", 0.5),
	},

	":hover": {
		backgroundColor: alpha("#fff", 0.05),
	},

	"&.active": {
		color: "#fff",
		svg: {
			color: "primary.main",
		},
		backgroundColor: alpha("#fff", 0.05),
		":hover": {
			backgroundColor: alpha("#fff", 0.09),
		},
	},
};

const SidebarMenuIten = (props: { to: string; icon: React.ReactNode; text: string }) => {
	return (
		<MenuItem component={Link} to={props.to} sx={sidebarsx}>
			<ListItemIcon sx={{ color: "#fff" }}>{props.icon}</ListItemIcon>
			<ListItemText>{props.text}</ListItemText>
		</MenuItem>
	);
};
