-- Fix Supabase API access to password column
-- Run this in Supabase SQL Editor

-- Make sure the users table exists and has the password column
ALTER TABLE users ALTER COLUMN password SET NOT NULL;

-- Reload the PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
