import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://ybcowivznkuauyibygeq.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseURL, supabaseAnonKey, {
    auth: { persistSession: false },
});