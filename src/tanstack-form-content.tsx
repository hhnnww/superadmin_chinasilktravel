import type { TextFieldProps } from "@mui/material";
import { Button, Grid, TextField as MuiTextField } from "@mui/material";
import { createFormHookContexts } from "@tanstack/react-form";
import { createFormHook } from "@tanstack/react-form";
import type { ReactNode } from "@tanstack/react-router";

import type { ButtonProps } from "@mui/material/Button";

const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

const TextField = (props: {
	text_field_props?: TextFieldProps;
	size?: number;
}) => {
	const field = useFieldContext();
	return (
		<Grid size={props?.size ? props.size : 12}>
			<MuiTextField
				{...props.text_field_props}
				label={field.name}
				name={field.name}
				value={field.state.value || ""}
				onBlur={() => field.handleBlur()}
				error={!field.state.meta.isValid}
				onChange={(e) => field.handleChange(e.target.value)}
				helperText={field.state.meta.errors
					.map((item) => item.message)
					.join("")}
				autoComplete="off"
				fullWidth
			/>
		</Grid>
	);
};

function SubscribeButton(props: ButtonProps & { children: ReactNode }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
			{([canSubmit, isSubmitting]) => (
				<Button
					{...props}
					onClick={async () => {
						await form.handleSubmit();
					}}
					loading={!canSubmit || isSubmitting}
				>
					{props.children}
				</Button>
			)}
		</form.Subscribe>
	);
}

export const { useAppForm, withForm } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
