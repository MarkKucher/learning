import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://hgrdcvsykfndbuopbhfj.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseURL, supabaseKey, {
    auth: { persistSession: false }
});