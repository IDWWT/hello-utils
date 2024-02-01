ALTER TABLE user_master DROP COLUMN access_token;
ALTER TABLE user_master DROP COLUMN refresh_token;
ALTER TABLE user_master DROP COLUMN expires_at;
ALTER TABLE user_master MODIFY COLUMN provider enum('GITHUB') NOT NULL COMMENT '연동 로그인 제공자';
ALTER TABLE user_master DROP KEY user_email;
ALTER TABLE user_master ADD CONSTRAINT UNIQUE_EMAIL_PROVIDER UNIQUE KEY (user_email, provider);
