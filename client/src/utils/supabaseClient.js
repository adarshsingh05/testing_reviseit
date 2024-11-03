// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oqufvztnijspmjevvccb.supabase.co'; // Use VITE_ prefix
console.log(supabaseUrl); // Check if the URL is being logged correctly
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdWZ2enRuaWpzcG1qZXZ2Y2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MTI3NjQsImV4cCI6MjA0NjA4ODc2NH0.CpM01ukH_Gv5CKjSs4SD2Pk6O1CekiZ28q1S3ZVwEkY'; // Use VITE_ prefix

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
