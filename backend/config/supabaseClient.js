const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://cwabbcmwodzxtkcduvoo.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YWJiY213b2R6eHRrY2R1dm9vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDk4NzM0OCwiZXhwIjoyMDg2NTYzMzQ4fQ.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W1YpP81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = { supabase };
