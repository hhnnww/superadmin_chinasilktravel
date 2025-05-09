import { createClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient<Database>(
	import.meta.env.VITE_SUPA_URL,
	import.meta.env.VITE_SUPA_KEY,
);

export const supabaseStroga = supabaseClient.storage.from("chinasilktravel");
