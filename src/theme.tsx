import { createTheme } from "@mui/material";

export const theme = createTheme({
	cssVariables: true,
	defaultColorScheme: "dark",
	typography: {
		fontFamily: ["Montserrat", "sans-serif"].join(","),

		fontSize: 15,
		fontWeightLight: 300,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},

	colorSchemes: {
		dark: {
			palette: {
				mode: "dark",
				primary: {
					main: "rgb(41, 112, 255);",
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
							WebkitBoxShadow: "none",
							WebkitTextFillColor: theme.palette.text.primary,
							caretColor: theme.palette.text.primary,
							transition: "background-color 5000s ease-in-out 0s",
						},
					},
				}),
			},
		},
	},
});
