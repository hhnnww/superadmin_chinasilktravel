import { supabase } from "@/supabase";
import { useAppForm } from "@/tanstack-form-component";
import { Alert, Grid, Typography } from "@mui/material";
import { formOptions } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import type { Database } from "database.types";

export const PageEditComponent = (props: { values: Database["public"]["Tables"]["googleAdPage"]["Row"] } & { index: string }) => {
	// 更新PAGE或者COMMENT
	const mutation = useMutation({
		mutationFn: async (data: Database["public"]["Tables"]["googleAdPage"]["Row"]) => {
			await supabase.from("googleAdPage").update(data).eq("id", Number(props.values.id)).select("*").single();
		},
	});

	// 新建编辑表单
	const form = useAppForm({
		...formOptions({ defaultValues: props.values }),
		onSubmit: async ({ value }) => {
			mutation.mutate(value);
		},
	});

	const small_size = 3;
	return (
		<>
			<Grid size={12}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					style={{ width: "100%" }}
				>
					<Grid container spacing={2}>
						<Grid size={12}>
							<Typography variant="h4">{props.index}</Typography>
						</Grid>
						<Grid size={12}>
							<form.AppField name="title">{(field) => <field.TextField />}</form.AppField>
						</Grid>
						<Grid size={small_size}>
							<form.AppField name="author">{(field) => <field.TextField />}</form.AppField>
						</Grid>
						<Grid size={small_size}>
							<form.AppField name="address">{(field) => <field.TextField />}</form.AppField>
						</Grid>
						<Grid size={small_size}>
							<form.AppField name="star">{(field) => <field.TextField type={"number"} />}</form.AppField>
						</Grid>
						<Grid size={small_size}>
							<form.AppField name={"publish_date"}>{(field) => <field.TextField type={"date"} />}</form.AppField>
						</Grid>
						<Grid size={12}>
							<form.AppField name={"avatar"}>{(field) => <field.TextField />}</form.AppField>
						</Grid>
						<Grid size={12}>
							<form.AppField name={"content"}>{(field) => <field.TextField type="number" multiline rows={10} />}</form.AppField>
						</Grid>
						{mutation.isSuccess && (
							<Grid size={12}>
								<Alert severity="success">更新成功 保存时间 {new Date().toLocaleString()}</Alert>
							</Grid>
						)}
						<Grid size={12}>
							<form.AppForm>
								<form.SubscribeButton disabled={mutation.isPending}>{mutation.isPending ? "更新中..." : "更新"}</form.SubscribeButton>
							</form.AppForm>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</>
	);
};
