import { supabase } from "@/supabase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (!data.session) {
			throw redirect({ to: "/login" });
		}
		return redirect({ to: "/admin" });
	},
});

function App() {
	return <>im index</>;
}
