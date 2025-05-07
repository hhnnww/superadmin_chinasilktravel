import { Button, TextField as MuiTextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";
import { createFormHookContexts } from "@tanstack/react-form";
import { createFormHook } from "@tanstack/react-form";
import type { ReactNode } from "@tanstack/react-router";

const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

const TextField = (props: TextFieldProps) => {
	const field = useFieldContext();
	return (
		<MuiTextField
			{...props}
			label={field.name}
			name={field.name}
			value={field.state.value || ""}
			onBlur={() => field.handleBlur()}
			error={!field.state.meta.isValid}
			onChange={(e) => field.handleChange(e.target.value)}
			helperText={field.state.meta.errors.map((item) => item.message).join("")}
			type={props?.type ? props.type : "text"}
		/>
	);
};

function SubscribeButton(props: ButtonProps & { children: ReactNode }) {
	const form = useFormContext();
	return (
		<form.Subscribe>
			{() => (
				<Button
					{...props}
					onClick={() => {
						form.handleSubmit();
					}}
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
