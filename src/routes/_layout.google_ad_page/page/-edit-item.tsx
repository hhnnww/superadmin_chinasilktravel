import {
	Alert,
	Button,
	Grid,
	Stack,
	type TextFieldProps,
	Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Database } from "database.types";
import dayjs from "dayjs";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { supabaseClient } from "@/supabase";
import { useAppForm } from "@/tanstack-form-content";

import { Route } from "./edit.$id";

export const GoogleAdPageEditItem = (props: {
	value: Database["public"]["Tables"]["googleAdPage"]["Row"];
	label: string;
}) => {
	const params = Route.useParams();
	const queryClient = useQueryClient();

	// 更新当前ITEM
	const mutationUpdate = useMutation({
		mutationFn: async (
			value: Database["public"]["Tables"]["googleAdPage"]["Row"],
		) => {
			await supabaseClient
				.from("googleAdPage")
				.update(value)
				.eq("id", props.value.id);
		},
	});

	// 删除当前ITEM
	const mutationDelete = useMutation({
		mutationFn: async () => {
			if (confirm("删除后无法恢复，确定要删除吗")) {
				await supabaseClient
					.from("googleAdPage")
					.delete()
					.eq("id", props.value.id);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["google", "page", "single", params.id],
			});
		},
	});

	// 创建表单
	const form = useAppForm({
		defaultValues: { ...props.value },
		onSubmit: async ({ value }) => await mutationUpdate.mutateAsync(value),
	});

	// 这里的name需要和数据库的字段名一致
	type FormItemType = {
		name: keyof Database["public"]["Tables"]["googleAdPage"]["Row"];
		size: number;
		type?: string;
		inpuProps?: TextFieldProps;
	};

	// 这里的name需要和数据库的字段名一致
	const form_items: FormItemType[] = [
		{ name: "title", size: 12 },
		{ name: "author", size: 3 },
		{ name: "address", size: 3 },
		{ name: "star", size: 3, inpuProps: { type: "number" } },
		{ name: "publish_date", size: 3, inpuProps: { type: "date" } },
		{ name: "avatar", size: 12, type: "image" },
		{ name: "content", size: 12, inpuProps: { multiline: true, minRows: 5 } },
	];

	return (
		<>
			<Grid size={12}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<Grid container spacing={2}>
						<Grid size={12}>
							<Typography variant="h5" sx={{ textTransform: "capitalize" }}>
								{props.label}
							</Typography>
						</Grid>
						{form_items.map((item) =>
							item.type === "image" ? (
								<form.AppField key={props.value.id.toString()} name={item.name}>
									{(field) => (
										<field.ImageField
											id={props.value.id.toString()}
											transform={{ width: 200, height: 200, quality: 30 }}
										/>
									)}
								</form.AppField>
							) : (
								<form.AppField key={props.value.id.toString()} name={item.name}>
									{(field) => (
										<field.TextField
											size={item.size}
											TextFieldProps={{
												label: item.name,
												type: item.inpuProps?.type,
												...item.inpuProps,
											}}
										/>
									)}
								</form.AppField>
							),
						)}

						<Grid size={12}>
							<form.AppForm>
								<form.Subscribe>
									<Stack
										alignItems={"center"}
										direction={"row"}
										justifyContent={"space-between"}
									>
										<Stack
											direction={"row"}
											sx={{ minHeight: "50px" }}
											alignItems={"center"}
											spacing={2}
										>
											<form.SubscribeButton startIcon={<SaveOutlinedIcon />}>
												Update
											</form.SubscribeButton>

											{mutationUpdate.isSuccess && (
												<Alert>
													{`success updata ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`}
												</Alert>
											)}
										</Stack>
										<Button
											startIcon={<ClearOutlinedIcon />}
											variant="text"
											color="error"
											onClick={() => mutationDelete.mutate()}
										>
											delete
										</Button>
									</Stack>
								</form.Subscribe>
							</form.AppForm>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</>
	);
};
