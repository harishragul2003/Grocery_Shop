-- Update passwords for existing users
UPDATE users SET password = '$2b$10$wsa0IIIqnRCdXoiWs1c/keOAB1Jqu6zrc/7kfCHFopgnNhrPTFx3m' WHERE email = 'john@example.com';
UPDATE users SET password = '$2b$10$a3wO6SpxXxHYgUGVO82cQupKWQ7wcCAxdJXFOGFGSIHDQJHBh.8NW' WHERE email = 'admin@example.com';
UPDATE users SET password = '$2b$10$wsa0IIIqnRCdXoiWs1c/keOAB1Jqu6zrc/7kfCHFopgnNhrPTFx3m' WHERE email = 'jane@example.com';

-- Verify the update
SELECT email, role FROM users;
