ALTER TABLE user_master DROP KEY UNIQUE_EMAIL_PROVIDER;
ALTER TABLE user_master DROP COLUMN provider;
ALTER TABLE user_master ADD CONSTRAINT user_master_unique UNIQUE KEY (user_email);
