import { CustomListItemButton } from "@/component/ListItemButton";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import {
	Box,
	List,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	useTheme,
} from "@mui/material";
import type { LinkProps } from "@tanstack/react-router";

export const AdminSidebar = () => {
	const sidebar_menus = [
		{
			title: "GoogleAdPage",
			menus: [
				{
					title: "谷歌广告页面",
					path: {
						to: "/admin/googleAd/page/list/$page",
						params: { page: "1" },
					} as LinkProps,
					icon: <SourceOutlinedIcon />,
				},
				{
					title: "谷歌广告销售",
					path: {
						to: "/admin/googleAd/saler/list/$page",
						params: { page: "1" },
					} as LinkProps,
					icon: <ContactPhoneOutlinedIcon />,
				},
			],
		},

		{
			title: "PhotoLibrary",
			menus: [
				{
					title: "图片库",
					path: {
						to: "/admin/PhotoLibrary/list",
						params: { num: "1" },
					} as LinkProps,
					icon: <SourceOutlinedIcon />,
				},
			],
		},
	];
	const theme = useTheme();
	return (
		<Box my={2}>
			{sidebar_menus.map((menu) => (
				<List
					sx={{ mb: 2 }}
					subheader={<ListSubheader>{menu.title}</ListSubheader>}
					key={menu.title}
				>
					{menu.menus.map((subMenu) => (
						<CustomListItemButton
							sx={{
								color: theme.palette.text.disabled,
								svg: { color: theme.palette.text.disabled },
								"&.active": {
									backgroundColor: theme.palette.action.hover,
									color: theme.palette.text.primary,
									svg: { color: theme.palette.primary.main },
								},
							}}
							key={subMenu.title}
							to={subMenu.path.to}
							params={subMenu.path.params}
							divider
						>
							<ListItemIcon>{subMenu?.icon ? subMenu.icon : "0"}</ListItemIcon>
							<ListItemText
								sx={{ span: { fontSize: "15px" } }}
								primary={subMenu.title}
							/>
						</CustomListItemButton>
					))}
				</List>
			))}
		</Box>
	);
};
