import { supabase } from "@/supabase";
import { useAppForm } from "@/tanstack-form-content";
import { Stack } from "@mui/material";
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
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async (values) => {
			const res = await supabase.auth.signInWithPassword({
				email: values.value.email,
				password: values.value.password,
			});
			if (res.error) {
				alert(`Login failed: ${res.error?.message}`);
			}
			if (!res.error) {
				navigate({ to: "/admin" });
			}
		},
		validators: {
			onSubmit: z.object({
				email: z.string().email(),
				password: z.string().min(6),
			}),
		},
	});

	return (
		<Stack width={"100vw"} height={"100vh"} justifyContent="center" alignItems="center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<Stack spacing={2} alignItems={"start"} sx={{ width: "450px" }}>
					<form.AppField name="email">{(field) => <field.TextField autoComplete="off" />}</form.AppField>
					<form.AppField name="password">{(field) => <field.TextField type="password" autoComplete="off" />}</form.AppField>
					<form.AppForm>
						<form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>{([isSubmitting, canSubmit]) => <form.SubscribeButton disabled={isSubmitting || !canSubmit}>login</form.SubscribeButton>}</form.Subscribe>
					</form.AppForm>
				</Stack>
			</form>
		</Stack>
	);
}
