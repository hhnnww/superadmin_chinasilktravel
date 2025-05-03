import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { ReactNode } from "@tanstack/react-router";

export const CusTable = (props: { tableHeader: string[]; tableBody: string[][] | ReactNode[][] }) => {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						{props.tableHeader.map((header, index) => (
							<TableCell key={index.toString()}>{header}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{props.tableBody.map((row, rowIndex) => (
						<TableRow key={rowIndex.toString()}>
							{row.map((header, cellIndex) => (
								<TableCell key={cellIndex.toString()}>{header}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
