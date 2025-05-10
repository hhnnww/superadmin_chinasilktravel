import { supabaseClient } from "@/supabase";
import { useAppForm } from "@/tanstack-form-content";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { form_fields, type loginType } from "./-hook";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data } = await supabaseClient.auth.getSession();
		if (data.session) {
			throw redirect({ to: "/" });
		}
	},
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const mutationLogin = useMutation({
		mutationFn: async (data: loginType) => {
			await supabaseClient.auth.signInWithPassword({
				email: data.email,
				password: data.password,
			});
		},
	});

	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await mutationLogin.mutateAsync(value);
			navigate({ to: "/" });
		},
	});

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
					<Grid container spacing={2} sx={{ width: "400px" }}>
						{form_fields.map((field) => (
							<form.AppField name={field.name} key={field.name}>
								{(item) => (
									<item.TextField
										text_field_props={{ type: field.inputProps.type }}
									/>
								)}
							</form.AppField>
						))}

						<form.AppForm>
							<form.Subscribe selector={(state) => state.isSubmitting}>
								{(isSubmitting) => (
									<form.SubscribeButton type="submit" loading={isSubmitting}>
										login
									</form.SubscribeButton>
								)}
							</form.Subscribe>
						</form.AppForm>
					</Grid>
				</Stack>
			</form>
		</>
	);
}
