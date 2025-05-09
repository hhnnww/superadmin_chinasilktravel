import { CustomListItemButton } from "@/component/ListItemButton";
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	useTheme,
} from "@mui/material";
import type { LinkProps, ReactNode } from "@tanstack/react-router";

type SIDEBAR_MENUS = {
	title: string;
	menus: SIDEBAR_MENU_ITEM[];
}[];

type SIDEBAR_MENU_ITEM = {
	name: string;
	link: LinkProps;
	icon: ReactNode;
};

export const LayoutSidebar = () => {
	const sidebar_menus: SIDEBAR_MENUS = [
		{
			title: "GoogleAd",
			menus: [
				{
					name: "GoogleAdPage",
					icon: <BlurOnOutlinedIcon />,
					link: { to: "/googlead/page" },
				},
				{
					name: "GoogleAdSaler",
					icon: <BlurOnOutlinedIcon />,
					link: { to: "/googlead/saler" },
				},
			],
		},
		{
			title: "PhotoLibrary",
			menus: [
				{
					name: "PhotoLibrary",
					icon: <BlurOnOutlinedIcon />,
					link: { to: "/images" },
				},
			],
		},
	];

	return sidebar_menus.map((menu) => (
		<List
			key={menu.title}
			subheader={
				<ListSubheader key={menu.title} sx={{ fontWeight: 500 }}>
					{menu.title}
				</ListSubheader>
			}
		>
			{menu?.menus?.map((item) => (
				<SidebarItem {...item} key={item.name} />
			))}
		</List>
	));
};

const SidebarItem = (props: {
	name: string;
	link: LinkProps;
	icon: ReactNode;
}) => {
	const theme = useTheme();
	return (
		<ListItem
			sx={{
				a: {
					color: theme.palette.text.disabled,
					"&.active": {
						backgroundColor: theme.palette.action.hover,
						span: { fontWeight: 600 },
						color: theme.palette.text.primary,
						svg: { color: theme.palette.primary.main },
					},
				},
			}}
			disablePadding
		>
			<CustomListItemButton to={props.link.to}>
				<ListItemIcon>{props.icon}</ListItemIcon>
				<ListItemText>{props.name}</ListItemText>
			</CustomListItemButton>
		</ListItem>
	);
};
