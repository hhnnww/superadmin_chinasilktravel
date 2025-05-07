import { CustomMenuItemLink } from "@/component/MenuLink";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import { Box, ListItemIcon, ListItemText, MenuItem, MenuList, alpha, useTheme } from "@mui/material";
import type { LinkOptions } from "@tanstack/react-router";
import type { ReactNode } from "react";
export const AdminSidebar = () => {
	const menu_list = [
		{
			title: "GoogleAdPage",
			menus: [
				{ title: "page", link: { to: "/admin/googleAdpage/page" } as LinkOptions, icon: <NewspaperOutlinedIcon /> },
				{ title: "saler", link: { to: "/admin/googleAdpage/saler" } as LinkOptions, icon: <ContactPhoneOutlinedIcon /> },
			],
		},
	];

	return (
		<>
			<MenuList>
				{menu_list.map((menu) => {
					return (
						<Box key={menu.title}>
							<AdminSIdebarTitle title={menu.title} />
							{menu.menus.map((subMenu) => {
								return <AdminSidebarButton key={subMenu.title} {...subMenu} />;
							})}
						</Box>
					);
				})}
			</MenuList>
		</>
	);
};

const AdminSidebarButton = (props: { title: string; link: LinkOptions; icon: ReactNode }) => {
	const theme = useTheme();
	return (
		<CustomMenuItemLink
			sx={{
				py: 1,
				mb: 0.2,
				color: theme.palette.text.disabled,
				svg: { color: theme.palette.text.disabled, width: "25px" },
				borderRadius: "12px",
				"&.active": { svg: { color: theme.palette.primary.main }, color: theme.palette.text.primary, background: alpha("#000", 0.02), ":hover": { background: theme.palette.action.hover } },
			}}
			to={props.link.to}
		>
			<ListItemIcon>{props.icon}</ListItemIcon>
			<ListItemText sx={{ textTransform: "capitalize" }}>{props.title}</ListItemText>
		</CustomMenuItemLink>
	);
};

const AdminSIdebarTitle = (props: { title: string }) => {
	return (
		<MenuItem
			disabled
			sx={{
				fontWeight: "bold",
				fontSize: "13px",
			}}
		>
			{props.title}
		</MenuItem>
	);
};
