import { supabase } from "@/supabase";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { useState } from "react";
import shortUUID from "short-uuid";
import { useImmer } from "use-immer";

export const UpdateImage = () => {
	const [open, setOpen] = useState(false);
	const [count, setCount] = useImmer({
		length: 0,
		current: 0,
	});

	const navigate = useNavigate();
	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files || files.length === 0) return;
		setOpen(true);
		setCount((draft) => {
			draft.length = files.length;
		});

		for (const file of files) {
			setCount((draft) => {
				draft.current += 1;
			});
			const uniqueFileNames = `${shortUUID().generate()}.jpg`;
			await supabase.storage.from(import.meta.env.VITE_STORAGE).upload(`public/${uniqueFileNames}`, file);
		}
		event.target.value = "";
		setOpen(false);
		navigate({ to: "/admin/ImageLibrary/list/$num", params: { num: "1" } });
	};

	return (
		<>
			{open && (
				<Box sx={{ width: "100%", mb: 2 }}>
					<Typography>{`正在上传 第 ${count.current} 张图片 / 一共 ${count.length} 张图片`}</Typography>
					<LinearProgress />
				</Box>
			)}
			<input type="file" accept="image/*" multiple onChange={handleFileChange} />
		</>
	);
};
