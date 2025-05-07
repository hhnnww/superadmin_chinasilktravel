import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { ReactNode } from "@tanstack/react-router";

export const CustomTable = (props: { header: string[]; body: (string | ReactNode | null)[][] }) => {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow sx={{ textTransform: "capitalize" }}>
						{props.header.map((header, index) => (
							<TableCell key={index.toString()}>{header}</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{props.body.map((row, rowIndex) => (
						<TableRow key={rowIndex.toString()}>
							{row.map((cell, cellIndex) => (
								<TableCell key={cellIndex.toString()}>{cell}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
