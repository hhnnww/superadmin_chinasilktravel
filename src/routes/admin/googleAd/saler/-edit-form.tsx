import { supabase } from "@/supabase";
import { useAppForm } from "@/tanstack-form-content";
import { Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import type { Database } from "database.types";

export const GoogleAdSalerEditForm = (props: { value: Database["public"]["Tables"]["googleAdSaler"]["Row"] } & { label?: string }) => {
	const mutation = useMutation({
		mutationFn: async (data: Database["public"]["Tables"]["googleAdSaler"]["Row"]) => await supabase.from("googleAdSaler").update(data).eq("id", data.id),
	});

	const form = useAppForm({
		defaultValues: { ...props.value },
		onSubmit: async (data) => {
			await mutation.mutateAsync(data.value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			style={{ width: "100%" }}
		>
			<Stack spacing={2} sx={{ width: "100%" }} direction={"column"} alignItems={"start"}>
				<form.AppField name={"name"}>{(field) => <field.TextField />}</form.AppField>
				<form.AppField name={"ori_name"}>{(field) => <field.TextField />}</form.AppField>
				<form.AppField name={"email"}>{(field) => <field.TextField />}</form.AppField>
				<form.AppField name={"phone"}>{(field) => <field.TextField />}</form.AppField>
				<form.AppField name={"wechat"}>{(field) => <field.TextField />}</form.AppField>
				<form.AppField name={"whatapp"}>{(field) => <field.TextField />}</form.AppField>
				<form.AppForm>
					<form.Subscribe>{() => <form.SubscribeButton>Update</form.SubscribeButton>}</form.Subscribe>
				</form.AppForm>
			</Stack>
		</form>
	);
};
