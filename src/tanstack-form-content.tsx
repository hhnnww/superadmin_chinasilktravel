import type { TextFieldProps } from "@mui/material";
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	TextField as MuiTextField,
	Stack,
} from "@mui/material";
import { createFormHookContexts } from "@tanstack/react-form";
import { createFormHook } from "@tanstack/react-form";
import type { ReactNode } from "@tanstack/react-router";
import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";
import { numbers } from "nanoid-dictionary";

import type { ButtonProps } from "@mui/material/Button";
import type { TransformOptions } from "@supabase/storage-js/src/lib/types";
import { useMutation } from "@tanstack/react-query";
import { supabaseStroga } from "./supabase";

const { fieldContext, useFieldContext, formContext, useFormContext } =
	createFormHookContexts();

export const AvaTarField = (props: {
	transform: TransformOptions;
	id: string;
}) => {
	const field = useFieldContext();
	const mutation = useMutation({
		mutationKey: ["image_update", field.name],
		mutationFn: async (e: FileList) => {
			const nano = customAlphabet(lowercase + numbers, 10);
			const new_name = `${nano().toString()}.jpg`;
			const res = (await supabaseStroga.update(new_name, e[0])).data?.path;
			const { data } = supabaseStroga.getPublicUrl(res || "", {
				transform: props.transform,
			});
			return data.publicUrl;
		},
		onSuccess: (data) => {
			field.handleChange(data);
		},
	});

	return (
		<>
			<Stack direction={"row"} spacing={1} alignItems={"start"}>
				{typeof field.state.value === "string" && (
					<img
						style={{ width: 80, height: 80 }}
						src={field.state.value || ""}
						alt={field.name}
					/>
				)}

				{mutation.isPending && (
					<Box sx={{ display: "flex" }}>
						<CircularProgress />
					</Box>
				)}

				<Button component={"label"} htmlFor={`${props.id}_file_up`}>
					{`update ${field.name}`}
				</Button>
				<Button onClick={() => field.handleChange(null)}>clear</Button>
				<input
					style={{ display: "none" }}
					id={`${props.id}_file_up`}
					type="file"
					multiple={false}
					name={field.name}
					accept="image/*"
					onBlur={() => field.handleBlur()}
					onChange={async (e) => {
						if (e.target.files) {
							await mutation.mutateAsync(e.target.files);
						}
					}}
				/>
			</Stack>
		</>
	);
};

const TextField = (props: {
	TextFieldProps?: TextFieldProps;
	size?: number;
}) => {
	const field = useFieldContext();
	return (
		<Grid size={props?.size ? props.size : 12}>
			<MuiTextField
				{...props.TextFieldProps}
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
		ImageField: AvaTarField,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
