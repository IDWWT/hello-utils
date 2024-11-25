package com.helloutils.hellocode.common;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import com.helloutils.hellocode.repository.UtilRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
@Profile({"dev", "local"})
public class TestDataInitializer implements ApplicationRunner {
    private final UtilRepository utilRepository;
    private final EntityManager entityManager;

    @Autowired
    public TestDataInitializer(UtilRepository utilRepository, EntityManager entityManager) {
        this.utilRepository = utilRepository;
        this.entityManager = entityManager;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        utilRepository.deleteAll();

        List<String> userIdList = Arrays.asList(
            "ddeb0a3b-3c87-4fa3-ae9d-0c7d7d3e606f",
            "8b0d79c3-eb3b-4f65-aeec-0d9b9c85fc10",
            "4e3d9ee7-02d9-4929-a47e-0e2b64eb8e70",
            "77e75092-07e2-48a8-b68e-6f7de34b2941",
            "d9675b3d-5e45-4e5c-8a1b-0071c9b92c9e",
            "9dd8e5b5-2296-49c1-b0a4-fbaa24bb7243",
            "e5c8217b-7c42-45b1-ba02-fb66737e8946",
            "a896b55d-92b3-4b81-835f-9ff5e2e5fb52",
            "6bf15970-499f-4f1d-b29e-40f4ff2f8a86",
            "370c0ff7-8e76-42d7-b55d-7fd4e504e5db",
            "787f6c42-cf2d-454f-bf0b-9c90d3ff42b2",
            "f7ff2d7d-bc6e-4e8d-8410-4f32822b74a8",
            "d8d48877-05a5-4653-ae26-23fe155e56c2",
            "2fc82b4f-42b1-49e7-8dc5-c2bb9f9c682e",
            "a31aee4f-5001-4a18-a874-9216f5f4972d",
            "5a1fe7ad-86f8-4c70-8841-78cc29b7a6a0",
            "147e5a84-5e41-4ef2-946d-475bb8c48d80",
            "604b74ac-1e35-46a3-81d3-181b5d0d3e77",
            "49e2d4e0-91a1-44c6-9b4c-2243e5f23ea4",
            "8d491ac8-6ec9-43e6-9405-b75890d8fba1",
            "334d537b-7e39-4540-ae29-2f7f1d4aa15b",
            "6f5d41e3-f18c-4a2d-b75f-5ab22b7e0b59",
            "61e3820f-81c0-4b32-8e8a-81a582831d79",
            "07ac9473-ef7a-4ad1-8a04-7c7339f6157c",
            "6b75d50b-12cf-4d6f-853e-67216516dc3e",
            "8f9a7b91-556d-40e3-9b73-ee2f7df122f7",
            "d9d8f82f-30e4-43df-ba1e-5ee8570f4f5b",
            "6ad89636-0377-4a9b-9d90-b0b24e4c7f08",
            "962cdd49-065f-4d4a-b10c-44bc52c9f9f7",
            "399c22fb-ff0b-4667-800a-f1bf6d7f1641",
            "48ef7e0d-89e4-4d29-95a4-d1a75b47796d",
            "098de9bb-5d6b-4e8e-bf27-267d8ff4436f"
        );

        Random random = new Random();

        for(int i = 1; i < userIdList.size()+1; i++) {
            LanguageCd[] languageCds = LanguageCd.values();
            LanguageCd randomLanguageCd = languageCds[random.nextInt(languageCds.length)];

            CategoryCd[] categoryCds = CategoryCd.values();
            CategoryCd randomCategoryCd = categoryCds[random.nextInt(categoryCds.length)];

            Util util = Util.builder()
                    .userId(userIdList.get(i-1))
                    .title("제목 " + i)
                    .description("설명 " + i)
                    .code("code " + i)
                    .languageCd(randomLanguageCd)
                    .categoryCd(randomCategoryCd)
                    .build();
            utilRepository.save(util);
        }
    }
}
