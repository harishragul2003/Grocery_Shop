import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cwabbcmwodzxtkcduvoo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YWJiY213b2R6eHRrY2R1dm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5ODczNDgsImV4cCI6MjA4NjU2MzM0OH0.Z6_UuoApX7NkbXXmZhS7R9Ek0Eu8B5DG6trqHZPPayE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
