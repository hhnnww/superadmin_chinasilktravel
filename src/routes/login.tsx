import { supabase } from "@/supabase";
import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();

	const form = useForm({
		defaultValues: { username: "", password: "" },

		onSubmit: async (values) => {
			const { data } = await supabase.auth.signInWithPassword({
				email: values.value.username,
				password: values.value.password,
			});
			if (data.session) {
				navigate({ to: "/admin" });
			} else {
				alert("账号或密码错误。");
			}
		},

		validators: {
			onChange: z.object({
				username: z.string().email("invalid email"),
				password: z.string().min(1, "password is required"),
			}),
		},
	});

	return (
		<Stack justifyContent="center" alignItems="center" height="100vh">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<Stack spacing={2} sx={{ width: "400px" }} alignItems={"start"}>
					{(["username", "password"] as const).map((fieldName) => (
						<form.Field key={fieldName} name={fieldName}>
							{(field) => <TextField label={fieldName} type={fieldName === "password" ? "password" : "text"} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} error={!field.state.meta.isValid} helperText={field.state.meta.errors[0]?.message} autoComplete="off" />}
						</form.Field>
					))}

					<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<Button disabled={!canSubmit} type="submit">
								{isSubmitting ? "..." : "login"}
							</Button>
						)}
					</form.Subscribe>
				</Stack>
			</form>
		</Stack>
	);
}
