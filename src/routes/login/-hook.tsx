export type loginType = {
	email: string;
	password: string;
};

export type FormField = {
	name: keyof loginType;
	size: number;
	inputProps: {
		type: string;
	};
}[];

export const form_fields: FormField = [
	{ name: "email", size: 12, inputProps: { type: "text" } },
	{ name: "password", size: 12, inputProps: { type: "password" } },
];
