import { type Components, type CssVarsTheme, type Theme, alpha } from "@mui/material/styles";
import { filledinputconfig } from "./filleinput";
import { MuiTextFieldConfig } from "./textfield";

export const components = {
	MuiButton: {
		defaultProps: {
			variant: "contained",
			color: "primary",
			disableElevation: true,
		},
	},

	MuiAppBar: {
		defaultProps: {
			color: "transparent",
			position: "static",
			variant: "outlined",
		},
	},

	MuiTextField: MuiTextFieldConfig,
	MuiFilledInput: filledinputconfig,

	MuiCard: {
		defaultProps: {
			elevation: 1,
			variant: "outlined",
		},
	},

	MuiCardHeader: {
		styleOverrides: {
			title: ({ theme }) => ({
				marginBottom: theme.spacing(1),
			}),
		},
	},

	MuiTableBody: {
		styleOverrides: {
			root: () => ({
				"&>tr": {
					":hover": {
						backgroundColor: alpha("#000", 0.02),
					},
				},
			}),
		},
	},

	MuiPaper: {
		defaultProps: {
			elevation: 1,
		},
	},

	MuiSelect: {
		defaultProps: {
			variant: "filled",
			fullWidth: true,
		},
	},

	MuiFormControl: {
		defaultProps: {
			variant: "filled",
			fullWidth: true,
		},
	},

	MuiCssBaseline: {
		styleOverrides: {
			a: {
				":-webkit-any-link": {
					textDecoration: "none",
				},
			},
		},
	},

	MuiTableHead: {
		styleOverrides: {
			root: ({ theme }) => ({
				"tr th": {
					textTransform: "uppercase",
					backgroundColor: theme.palette.TableCell.border,
					color: theme.palette.text.primary,
					fontWeight: 600,
					":first-child": {
						borderTopLeftRadius: theme.shape.borderRadius,
					},
					":last-child": {
						borderTopRightRadius: theme.shape.borderRadius,
					},
				},
			}),
		},
	},
} as Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>;
