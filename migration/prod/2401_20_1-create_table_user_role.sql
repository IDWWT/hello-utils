CREATE TABLE user_role (
    role_code VARCHAR(30) NOT NULL COMMENT '유저 권한 코드',
    role_name VARCHAR(50) NOT NULL COMMENT '유저 권한 이름',
    can_edit_post_yn ENUM('Y', 'N') NOT NULL COMMENT '글 작성/수정 가능 여부',
    can_delete_post_yn ENUM('Y', 'N') NOT NULL COMMENT '글 삭제 가능 여부',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;