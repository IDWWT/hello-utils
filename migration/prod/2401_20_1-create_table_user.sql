CREATE TABLE user (
    user_id CHAR(36) NOT NULL COMMENT '유저 ID, UUID() 사용',
    user_email VARCHAR(320) NOT NULL COMMENT '유저 이메일',
    provider enum('GOOGLE') NOT NULL COMMENT '연동 로그인 제공자',
    social_id VARCHAR(255) COMMENT '소셜 플랫폼에서 받아온 사용자 고유 ID',
    access_token VARCHAR(255) COMMENT 'OAuth 인증 후 발급된 액세스 토큰',
    refresh_token VARCHAR(255) COMMENT 'OAuth 인증 갱신을 위한 리프레시 토큰',
    expires_at TIMESTAMP COMMENT '액세스 토큰 만료 시간',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id),
    UNIQUE KEY (user_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;