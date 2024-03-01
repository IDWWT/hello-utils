package com.helloutils.hellocode.common;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.enums.CategoryCd;
import com.helloutils.hellocode.enums.LanguageCd;
import com.helloutils.hellocode.repository.UtilRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;
import java.util.Random;

@Component
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

        List<String> userIdList = entityManager.createNativeQuery(
                        "SELECT DISTINCT user_id FROM user_master")
                .getResultList();

        Random random = new Random();

        for(int i = 0; i < userIdList.size(); i++) {
            LanguageCd[] languageCds = LanguageCd.values();
            LanguageCd randomLanguageCd = languageCds[random.nextInt(languageCds.length)];

            CategoryCd[] categoryCds = CategoryCd.values();
            CategoryCd randomCategoryCd = categoryCds[random.nextInt(categoryCds.length)];

            Util util = Util.builder()
                    .userId(userIdList.get(i))
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
