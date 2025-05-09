import { supabase } from "@/supabase";
import { useAppForm } from "@/tanstack-form-content";
import { Alert, Button, Grid, Stack, Typography } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Database } from "database.types";
import dayjs from "dayjs";

export const LayoutEditItem = (props: {
	value: Database["public"]["Tables"]["googleAdPage"]["Row"];
	label: string;
}) => {
	const queryClient = useQueryClient();
	// 更新ITEM
	const updateMutation = useMutation({
		mutationFn: async (
			data: Database["public"]["Tables"]["googleAdPage"]["Update"],
		) =>
			await supabase
				.from("googleAdPage")
				.update(data)
				.eq("id", data.id || 0),
	});

	// 删除ITEM
	const deleteMutation = useMutation({
		mutationFn: async (id: number) =>
			await supabase.from("googleAdPage").delete().eq("id", id),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["googleadpage"],
			});
			alert("delete success");
		},
	});

	// 表单
	const form = useAppForm({
		defaultValues: { ...props.value },
		onSubmit: async ({
			value,
		}: {
			value: Database["public"]["Tables"]["googleAdPage"]["Update"];
		}) => {
			await updateMutation.mutateAsync(value);
		},
	});

	// 表单字段
	const small_size = 3;
	const form_fields: {
		name: keyof Database["public"]["Tables"]["googleAdPage"]["Row"];
		size: number;
		input_props?: TextFieldProps;
	}[] = [
		{ name: "title", size: 12 },
		{ name: "author", size: small_size },
		{ name: "address", size: small_size },
		{ name: "star", size: small_size },
		{ name: "publish_date", size: small_size, input_props: { type: "date" } },
		{ name: "avatar", size: 12 },
		{ name: "content", size: 12, input_props: { multiline: true, minRows: 5 } },
	];

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<Grid container spacing={2}>
					<Grid size={12}>
						<Typography variant="h5">{props.label}</Typography>
					</Grid>
					{form_fields.map((item) => (
						<Grid size={item.size} key={item.name}>
							<form.AppField name={item.name}>
								{(field) => <field.TextField {...item.input_props} />}
							</form.AppField>
						</Grid>
					))}

					{updateMutation.isSuccess && (
						<Grid size={12}>
							<Alert>
								success update at {dayjs().format("YYYY-MM-DD HH:mm:ss")}
							</Alert>
						</Grid>
					)}

					<Grid size={12}>
						<Stack direction={"row"} spacing={1}>
							<form.AppForm>
								<form.Subscribe>
									{() => <form.SubscribeButton>Update</form.SubscribeButton>}
								</form.Subscribe>
							</form.AppForm>
							<Button
								color="error"
								onClick={async () => {
									if (confirm("Are you sure you want to delete this page?")) {
										await deleteMutation.mutateAsync(props.value.id);
									}
								}}
							>
								Delete
							</Button>
						</Stack>
					</Grid>
				</Grid>
			</form>
		</>
	);
};
