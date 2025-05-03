import type { Components, CssVarsTheme, Theme } from "@mui/material/styles";

export const filledinputconfig = {
	styleOverrides: {
		root: ({ theme }) => ({
			borderBottomLeftRadius: theme.shape.borderRadius,
			borderBottomRightRadius: theme.shape.borderRadius,
			"::after": {
				display: "none",
			},
			"::before": {
				display: "none",
			},
			transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
			backgroundColor: "transparent",
			"&:hover": {
				backgroundColor: theme.palette.action.hover,
			},
			borderColor: theme.palette.divider,
			borderWidth: 1,
			borderStyle: "solid",

			variants: [
				{
					props: { color: "primary", error: false },
					style: {
						"&.Mui-focused": {
							borderColor: theme.palette.primary.main,
							boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
							backgroundColor: "transparent",
						},
					},
				},
				{
					props: { color: "primary", error: true },
					style: {
						"&.Mui-focused": {
							borderColor: theme.palette.error.main,
							boxShadow: `0 0 0 2px ${theme.palette.error.main}`,
							backgroundColor: "transparent",
						},
					},
				},
			],

			input: {
				borderRadius: theme.shape.borderRadius,

				":-webkit-autofill": {
					WebkitBoxShadow: "0 0 0 100px #fff inset !important",
					backgroundColor: "transparent !important",
					WebkitTextFillColor: "#000 !important",
					caretColor: "#000",
				},
			},
		}),
	},
} as Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>["MuiFilledInput"];
