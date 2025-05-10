import { CustomListItemButton } from "@/component/ListItemButton";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Stack,
	useTheme,
} from "@mui/material";
import type { LinkProps, ReactNode } from "@tanstack/react-router";
type MenuItem = { name: string; icon: ReactNode; link: LinkProps };
type SidebarMenuItem = { title: string; menus: MenuItem[] };

export const LayoutSidebar = () => {
	const sidebar_menu: SidebarMenuItem[] = [
		{
			title: "TravelProducts",
			menus: [
				{
					name: "TravelProducts",
					icon: <AirplaneTicketOutlinedIcon />,
					link: { to: "/travel/products" },
				},
				{
					name: "CityCategory",
					icon: <ExploreOutlinedIcon />,
					link: { to: "/travel/city" },
				},
			],
		},
		{
			title: "GoogleAdPage",
			menus: [
				{
					name: "GoogleAdPage",
					icon: <AddToDriveOutlinedIcon />,
					link: { to: "/google_ad_page/page" },
				},
				{
					name: "GoogleAdSaler",
					icon: <ContactPhoneOutlinedIcon />,
					link: { to: "/google_ad_page/saler" },
				},
			],
		},
		{
			title: "Images",
			menus: [
				{
					name: "Images",
					icon: <PhotoSizeSelectActualOutlinedIcon />,
					link: { to: "/images" },
				},
			],
		},
	];

	return (
		<Stack sx={{ width: "300px", position: "fixed" }} spacing={2} py={2}>
			{sidebar_menu.map((item) => (
				<SidebarList title={item.title} key={item.title} menus={item.menus} />
			))}
		</Stack>
	);
};

const SidebarList = (props: SidebarMenuItem) => {
	const theme = useTheme();
	return (
		<List subheader={<ListSubheader>{props.title}</ListSubheader>}>
			{props.menus.map((item) => (
				<ListItem divider disablePadding disableGutters key={item.name}>
					<CustomListItemButton
						to={item.link.to}
						sx={{
							color: theme.palette.text.disabled,
							svg: { color: theme.palette.text.secondary },
							"&.active": {
								svg: { color: theme.palette.primary.main },
								background: theme.palette.action.selected,
								color: theme.palette.text.primary,
								":hover": {
									svg: { color: theme.palette.primary.main },
								},
							},
							":hover": {
								color: theme.palette.text.primary,
								svg: { color: theme.palette.text.primary },
							},
						}}
					>
						<ListItemIcon sx={{ minWidth: "45px" }}>{item.icon}</ListItemIcon>
						<ListItemText>{item.name}</ListItemText>
					</CustomListItemButton>
				</ListItem>
			))}
		</List>
	);
};
