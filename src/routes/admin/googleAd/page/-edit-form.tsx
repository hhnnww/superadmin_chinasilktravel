import { supabase } from "@/supabase";
import { useAppForm } from "@/tanstack-form-content";
import { Alert, Divider, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import type { Database } from "database.types";

export const EditForm = (
	props: { value: Database["public"]["Tables"]["googleAdPage"]["Row"] } & {
		label?: string;
	},
) => {
	const mutation = useMutation({
		mutationFn: async (
			data: Database["public"]["Tables"]["googleAdPage"]["Row"],
		) => await supabase.from("googleAdPage").update(data).eq("id", data.id),
	});

	const form = useAppForm({
		defaultValues: { ...props.value },
		onSubmit: async (data) => {
			await mutation.mutateAsync(data.value);
		},
	});

	const small_size = 3;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<Grid container spacing={2}>
				{props?.label && (
					<Grid size={12}>
						<Typography variant="h5">{props.label}</Typography>
					</Grid>
				)}
				<Grid size={12}>
					<form.AppField name={"title"}>
						{(field) => <field.TextField />}
					</form.AppField>
				</Grid>
				<Grid size={small_size}>
					<form.AppField name={"author"}>
						{(field) => <field.TextField />}
					</form.AppField>
				</Grid>
				<Grid size={small_size}>
					<form.AppField name={"address"}>
						{(field) => <field.TextField />}
					</form.AppField>
				</Grid>
				<Grid size={small_size}>
					<form.AppField name={"star"}>
						{(field) => (
							<field.TextField
								type="number"
								slotProps={{ htmlInput: { min: 1, max: 5, step: 1 } }}
							/>
						)}
					</form.AppField>
				</Grid>
				<Grid size={small_size}>
					<form.AppField name={"publish_date"}>
						{(field) => <field.TextField type="date" />}
					</form.AppField>
				</Grid>
				<Grid size={12}>
					<form.AppField name={"avatar"}>
						{(field) => <field.TextField />}
					</form.AppField>
				</Grid>
				<Grid size={12}>
					<form.AppField name={"content"}>
						{(field) => <field.TextField multiline minRows={5} />}
					</form.AppField>
				</Grid>
				{mutation.isSuccess && (
					<Grid size={12}>
						<Alert
							severity={"success"}
						>{`Update success at ${new Date().toLocaleTimeString()}`}</Alert>
					</Grid>
				)}
				<Grid size={12}>
					<form.AppForm>
						<form.Subscribe>
							{() => <form.SubscribeButton>Update</form.SubscribeButton>}
						</form.Subscribe>
					</form.AppForm>
				</Grid>
				<Grid size={12}>
					<Divider />
				</Grid>
			</Grid>
		</form>
	);
};
