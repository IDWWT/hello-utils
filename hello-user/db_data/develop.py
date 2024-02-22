def init_user_master_dev(db_session):
    from models import UserMaster

    normal_user_01 = UserMaster(user_id='ddeb0a3b-3c87-4fa3-ae9d-0c7d7d3e606f', user_email='Aurora@gmail.com');
    normal_user_02 = UserMaster(user_id='8b0d79c3-eb3b-4f65-aeec-0d9b9c85fc10', user_email='Griffin@hotmail.com');
    normal_user_03 = UserMaster(user_id='4e3d9ee7-02d9-4929-a47e-0e2b64eb8e70', user_email='Isla@yahoo.com');
    normal_user_04 = UserMaster(user_id='77e75092-07e2-48a8-b68e-6f7de34b2941', user_email='Xavier@outlook.com');
    normal_user_05 = UserMaster(user_id='d9675b3d-5e45-4e5c-8a1b-0071c9b92c9e', user_email='Luna@gmail.com');
    normal_user_06 = UserMaster(user_id='9dd8e5b5-2296-49c1-b0a4-fbaa24bb7243', user_email='Asher@aol.com');
    normal_user_07 = UserMaster(user_id='e5c8217b-7c42-45b1-ba02-fb66737e8946', user_email='Nova@protonmail.com');
    normal_user_08 = UserMaster(user_id='a896b55d-92b3-4b81-835f-9ff5e2e5fb52', user_email='Jasper@icloud.com');
    normal_user_09 = UserMaster(user_id='6bf15970-499f-4f1d-b29e-40f4ff2f8a86', user_email='Ivy@live.com');
    normal_user_10 = UserMaster(user_id='370c0ff7-8e76-42d7-b55d-7fd4e504e5db', user_email='Phoenix@inbox.com');
    normal_user_11 = UserMaster(user_id='787f6c42-cf2d-454f-bf0b-9c90d3ff42b2', user_email='Scarlett@zoho.com');
    normal_user_12 = UserMaster(user_id='f7ff2d7d-bc6e-4e8d-8410-4f32822b74a8', user_email='Leo@yandex.com');
    normal_user_13 = UserMaster(user_id='d8d48877-05a5-4653-ae26-23fe155e56c2', user_email='Willow@yahoo.com');
    normal_user_14 = UserMaster(user_id='2fc82b4f-42b1-49e7-8dc5-c2bb9f9c682e', user_email='Finnley@hotmail.com');
    normal_user_15 = UserMaster(user_id='a31aee4f-5001-4a18-a874-9216f5f4972d', user_email='Savannah@gmail.com');
    normal_user_16 = UserMaster(user_id='5a1fe7ad-86f8-4c70-8841-78cc29b7a6a0', user_email='Eliana@outlook.com');
    normal_user_17 = UserMaster(user_id='147e5a84-5e41-4ef2-946d-475bb8c48d80', user_email='Rowan@yahoo.com');
    normal_user_18 = UserMaster(user_id='604b74ac-1e35-46a3-81d3-181b5d0d3e77', user_email='Ryder@icloud.com');
    normal_user_19 = UserMaster(user_id='49e2d4e0-91a1-44c6-9b4c-2243e5f23ea4', user_email='Harper@live.com');
    normal_user_20 = UserMaster(user_id='8d491ac8-6ec9-43e6-9405-b75890d8fba1', user_email='Milo@gmail.com');
    normal_user_21 = UserMaster(user_id='334d537b-7e39-4540-ae29-2f7f1d4aa15b', user_email='Stella@protonmail.com');
    normal_user_22 = UserMaster(user_id='6f5d41e3-f18c-4a2d-b75f-5ab22b7e0b59', user_email='Sawyer@icloud.com');
    normal_user_23 = UserMaster(user_id='61e3820f-81c0-4b32-8e8a-81a582831d79', user_email='Ruby@yahoo.com');
    normal_user_24 = UserMaster(user_id='07ac9473-ef7a-4ad1-8a04-7c7339f6157c', user_email='Kai@outlook.com');
    normal_user_25 = UserMaster(user_id='6b75d50b-12cf-4d6f-853e-67216516dc3e', user_email='Ember@gmail.com');
    normal_user_26 = UserMaster(user_id='8f9a7b91-556d-40e3-9b73-ee2f7df122f7', user_email='Declan@hotmail.com');
    normal_user_27 = UserMaster(user_id='d9d8f82f-30e4-43df-ba1e-5ee8570f4f5b', user_email='Autumn@yahoo.com');
    normal_user_28 = UserMaster(user_id='6ad89636-0377-4a9b-9d90-b0b24e4c7f08', user_email='Caleb@outlook.com');
    normal_user_29 = UserMaster(user_id='962cdd49-065f-4d4a-b10c-44bc52c9f9f7', user_email='Piper@gmail.com');
    normal_user_30 = UserMaster(user_id='399c22fb-ff0b-4667-800a-f1bf6d7f1641', user_email='Atlas@yahoo.com');
    normal_user_31 = UserMaster(user_id='48ef7e0d-89e4-4d29-95a4-d1a75b47796d', user_email='Seraphina@yahoo.com');
    normal_user_32 = UserMaster(user_id='098de9bb-5d6b-4e8e-bf27-267d8ff4436f', user_email='Orion@gmail.com');

    db_session.add_all([normal_user_01, normal_user_02, normal_user_03, normal_user_04, normal_user_05, normal_user_06, normal_user_07, normal_user_08, normal_user_09, normal_user_10, normal_user_11, normal_user_12, normal_user_13, normal_user_14, normal_user_15, normal_user_16, normal_user_17, normal_user_18, normal_user_19, normal_user_20, normal_user_21, normal_user_22, normal_user_23, normal_user_24, normal_user_25, normal_user_26, normal_user_27, normal_user_28, normal_user_29, normal_user_30, normal_user_31, normal_user_32])
