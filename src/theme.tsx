import { alpha, createTheme } from "@mui/material";

export const theme = createTheme({
	cssVariables: true,
	typography: {
		fontFamily: ["Montserrat", "sans-serif"].join(","),
		fontSize: 15,
		fontWeightLight: 300,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
	colorSchemes: {
		light: {
			palette: {
				mode: "light",
				divider: alpha("#000", 0.05),
				text: {
					primary: alpha("#000", 0.7),
					secondary: alpha("#000", 0.5),
				},
				background: {
					default: alpha("#000", 0.05),
					paper: "#fff",
				},
			},
		},
	},

	components: {
		MuiTextField: {
			defaultProps: {
				variant: "filled",
				fullWidth: true,
			},
		},
		MuiButton: {
			defaultProps: {
				variant: "contained",
				color: "primary",
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					input: {
						":-webkit-autofill": {
							boxShadow: `0 0 0 1000px ${"#dcdcdc"} inset`,
							"-webkit-text-fill-color": theme.palette.text.primary,
						},
					},
				}),
			},
		},
	},
});
