import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://hgrdcvsykfndbuopbhfj.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncmRjdnN5a2ZuZGJ1b3BiaGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDAzODMsImV4cCI6MjA1ODUxNjM4M30.TA-1po97h5RaGoNxzMtSar4TgN4nXoobezXjEg9KFDM" || '';

export const supabase = createClient(supabaseURL, supabaseKey, {
    auth: { persistSession: false },
});