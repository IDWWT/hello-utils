def init_user_role(db_session):
    from models import UserRole

    admin = UserRole(role_code="ADMIN", role_name="관리자", can_edit_post_yn="Y", can_delete_post_yn="Y")
    normal = UserRole(role_code="NORMAL", role_name="일반 사용자", can_edit_post_yn="Y", can_delete_post_yn="N")
    db_session.add_all([admin, normal])

# INSERT INTO user_master (user_id, user_email, role_code, social_id, created_at, updated_at)
# VALUES('fc5536f3-98b6-4e9d-82fd-5baf68789945', 'woogie.kim@dgmit.com', 'NORMAL', NULL, '2024-02-22 09:07:30', '2024-02-22 09:07:30');

def init_user_master(db_session):
    from models import UserMaster

    woogie = UserMaster(
        user_id='fc5536f3-98b6-4e9d-82fd-5baf68789945',
        user_email='woogie.kim@dgmit.com',
        role_code='ADMIN',
        created_at='2024-01-19 12:00:00',
        updated_at='2024-01-19 12:00:00',
    )
    db_session.add_all([woogie])
