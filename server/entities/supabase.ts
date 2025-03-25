import { createClient } from "@supabase/supabase-js";

const supabaseURL = 'https://hgrdcvsykfndbuopbhfj.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncmRjdnN5a2ZuZGJ1b3BiaGZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mjk0MDM4MywiZXhwIjoyMDU4NTE2MzgzfQ.Rs5-VxlyG0XjQRMG4F8HSAtHpDn7Y2RZwGqGAJ6C43g" || '';

export const supabase = createClient(supabaseURL, supabaseKey, {
    auth: { persistSession: false },
});