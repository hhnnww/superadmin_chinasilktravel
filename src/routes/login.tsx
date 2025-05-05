import { supabase } from "@/supabase";
import { useAppForm } from "@/tanstack-form-component";
import { Stack } from "@mui/material";
import { formOptions } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session) {
			throw redirect({ to: "/admin" });
		}
	},
});

function RouteComponent() {
	const navigate = Route.useNavigate();

	const form = useAppForm({
		...formOptions({
			defaultValues: {
				email: "",
				password: "",
			},
		}),
		validators: {
			onBlur: z.object({
				email: z.string().email({ message: "Invalid email address" }),
				password: z.string().min(6, { message: "Password must be at least 6 characters" }),
			}),
		},
		onSubmit: async ({ value }) => {
			const res = await supabase.auth.signInWithPassword({
				email: value.email,
				password: value.password,
			});
			if (res.error) {
				alert(res.error.message);
				return;
			}
			navigate({ to: "/admin" });
		},
	});

	return (
		<>
			<Stack sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<Stack spacing={2} sx={{ width: 300 }} alignItems={"start"}>
						<form.AppField name="email">{(field) => <field.TextField type="email" />}</form.AppField>
						<form.AppField name="password">{(field) => <field.TextField type="password" />}</form.AppField>
						<form.AppForm>
							<form.SubscribeButton label="Submit" />
						</form.AppForm>
					</Stack>
				</form>
			</Stack>
		</>
	);
}
