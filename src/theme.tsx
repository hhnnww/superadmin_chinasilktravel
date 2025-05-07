import { createTheme } from "@mui/material";

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
				primary: {
					main: "rgb(41, 112, 255);",
				},
				text: {
					primary: "#363636",
					secondary: "#696969",
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
					borderRadius: "12px",
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: ({ theme }) => ({
					input: {
						":-webkit-autofill": {
							boxShadow: `0 0 0 1000px ${"#efefef"} inset`,
							WebkitTextFillColor: theme.palette.text.primary,
						},
					},
				}),
			},
		},
	},
});
