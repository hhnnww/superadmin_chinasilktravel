import { supabaseClient } from "@/supabase";
import { useAppForm } from "@/tanstack-form-content";
import { Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import type { Database } from "database.types";

export const EditSalerItem = (
	props: Database["public"]["Tables"]["googleAdSaler"]["Update"],
) => {
	const mutationUpdateSaler = useMutation({
		mutationKey: ["googlead", "saler", "update"],
		mutationFn: async (data: typeof props) =>
			await supabaseClient
				.from("googleAdSaler")
				.update(data)
				.eq("id", Number(props.id)),
	});

	const form = useAppForm({
		defaultValues: { ...props },
		onSubmit: async ({ value }) => mutationUpdateSaler.mutateAsync(value),
	});

	return (
		<Grid size={12}>
			<form onSubmit={form.handleSubmit}>
				<Grid container spacing={2}>
					<form.AppField name="name">
						{(field) => (
							<field.TextField
								size={12}
								TextFieldProps={{ helperText: "名称" }}
							/>
						)}
					</form.AppField>

					<form.AppField name="email">
						{(field) => (
							<field.TextField
								size={12}
								TextFieldProps={{ helperText: "邮箱" }}
							/>
						)}
					</form.AppField>

					<form.AppField name="phone">
						{(field) => <field.TextField size={12} />}
					</form.AppField>
				</Grid>
			</form>
		</Grid>
	);
};
