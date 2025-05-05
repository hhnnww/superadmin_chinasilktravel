import { Button, TextField as MuiTextField } from "@mui/material";
import { createFormHookContexts } from "@tanstack/react-form";
import { createFormHook } from "@tanstack/react-form";

const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts();

const TextField = (props: { type: React.HTMLInputTypeAttribute }) => {
	const field = useFieldContext<string>();
	return <MuiTextField label={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} error={!field.state.meta.isValid} onChange={(e) => field.handleChange(e.target.value)} helperText={field.state.meta.errors.map((item) => item.message).join("")} type={props.type} />;
};

function SubscribeButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button onClick={form.handleSubmit} disabled={isSubmitting}>
					{label}
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
