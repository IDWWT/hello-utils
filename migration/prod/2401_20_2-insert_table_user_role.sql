INSERT INTO user_role
  (role_code, role_name, can_edit_post_yn, can_delete_post_yn)
VALUES
    ('ADMIN', '관리자', 'Y', 'Y')
  , ('NORMAL', '일반 사용자', 'Y', 'N')
;