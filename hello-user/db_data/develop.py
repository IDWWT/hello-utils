def init_user_master_dev(db_session):
    from models import UserMaster

    normal_user_01 = UserMaster(user_email='Aurora@gmail.com');
    normal_user_02 = UserMaster(user_email='Griffin@hotmail.com');
    normal_user_03 = UserMaster(user_email='Isla@yahoo.com');
    normal_user_04 = UserMaster(user_email='Xavier@outlook.com');
    normal_user_05 = UserMaster(user_email='Luna@gmail.com');
    normal_user_06 = UserMaster(user_email='Asher@aol.com');
    normal_user_07 = UserMaster(user_email='Nova@protonmail.com');
    normal_user_08 = UserMaster(user_email='Jasper@icloud.com');
    normal_user_09 = UserMaster(user_email='Ivy@live.com');
    normal_user_10 = UserMaster(user_email='Phoenix@inbox.com');
    normal_user_11 = UserMaster(user_email='Scarlett@zoho.com');
    normal_user_12 = UserMaster(user_email='Leo@yandex.com');
    normal_user_13 = UserMaster(user_email='Willow@yahoo.com');
    normal_user_14 = UserMaster(user_email='Finnley@hotmail.com');
    normal_user_15 = UserMaster(user_email='Savannah@gmail.com');
    normal_user_16 = UserMaster(user_email='Eliana@outlook.com');
    normal_user_17 = UserMaster(user_email='Rowan@yahoo.com');
    normal_user_18 = UserMaster(user_email='Ryder@icloud.com');
    normal_user_19 = UserMaster(user_email='Harper@live.com');
    normal_user_20 = UserMaster(user_email='Milo@gmail.com');
    normal_user_21 = UserMaster(user_email='Stella@protonmail.com');
    normal_user_22 = UserMaster(user_email='Sawyer@icloud.com');
    normal_user_23 = UserMaster(user_email='Ruby@yahoo.com');
    normal_user_24 = UserMaster(user_email='Kai@outlook.com');
    normal_user_25 = UserMaster(user_email='Ember@gmail.com');
    normal_user_26 = UserMaster(user_email='Declan@hotmail.com');
    normal_user_27 = UserMaster(user_email='Autumn@yahoo.com');
    normal_user_28 = UserMaster(user_email='Caleb@outlook.com');
    normal_user_29 = UserMaster(user_email='Piper@gmail.com');
    normal_user_30 = UserMaster(user_email='Atlas@yahoo.com');
    normal_user_31 = UserMaster(user_email='Seraphina@yahoo.com');
    normal_user_32 = UserMaster(user_email='Orion@gmail.com');

    db_session.add_all([normal_user_01, normal_user_02, normal_user_03, normal_user_04, normal_user_05, normal_user_06, normal_user_07, normal_user_08, normal_user_09, normal_user_10, normal_user_11, normal_user_12, normal_user_13, normal_user_14, normal_user_15, normal_user_16, normal_user_17, normal_user_18, normal_user_19, normal_user_20, normal_user_21, normal_user_22, normal_user_23, normal_user_24, normal_user_25, normal_user_26, normal_user_27, normal_user_28, normal_user_29, normal_user_30, normal_user_31, normal_user_32])
