// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oqufvztnijspmjevvccb.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xdWZ2enRuaWpzcG1qZXZ2Y2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1MTI3NjQsImV4cCI6MjA0NjA4ODc2NH0.CpM01ukH_Gv5CKjSs4SD2Pk6O1CekiZ28q1S3ZVwEkY'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
