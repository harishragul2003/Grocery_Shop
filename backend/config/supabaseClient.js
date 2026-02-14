const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://cwabbcmwodzxtkcduvoo.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YWJiY213b2R6eHRrY2R1dm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5ODczNDgsImV4cCI6MjA4NjU2MzM0OH0.Z6_UuoApX7NkbXXmZhS7R9Ek0Eu8B5DG6trqHZPPayE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
