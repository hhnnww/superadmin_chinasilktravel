import { type CssVarsThemeOptions, alpha } from "@mui/material/styles";

export const colorSchemes = {
	light: {
		palette: {
			primary: {
				main: "rgb(41, 112, 255)",
				contrastText: "#FFFFFF",
			},
			text: {
				primary: alpha("#000", 0.8),
				secondary: alpha("#000", 0.6),
				disabled: alpha("#000", 0.4),
			},
			divider: alpha("#000", 0.05),
			TableCell: { border: alpha("#000", 0.02), backgroundColor: alpha("#000", 0.1) },
		},
	},
} as Pick<CssVarsThemeOptions, "defaultColorScheme" | "colorSchemes" | "components">["colorSchemes"];
