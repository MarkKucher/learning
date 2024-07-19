import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://ybcowivznkuauyibygeq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliY293aXZ6bmt1YXV5aWJ5Z2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1MDkxNzksImV4cCI6MjAxMjA4NTE3OX0.MsYE1-Hd4rFzUxsbEFGHR52hKfpzpwn4I-lOMPv8HNM';


export const supabase = createClient(supabaseURL, supabaseAnonKey, {
    auth: { persistSession: false },
});