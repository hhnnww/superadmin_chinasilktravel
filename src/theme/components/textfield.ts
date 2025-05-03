import type { Components, CssVarsTheme, Theme } from "@mui/material";

export const MuiTextFieldConfig = {
	defaultProps: {
		variant: "filled",
		color: "primary",
		fullWidth: true,
	},
} as Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>["MuiTextField"];
