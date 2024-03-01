package com.helloutils.hellocode.common;

import com.helloutils.hellocode.repository.UtilRepository;
import jakarta.persistence.EntityManager;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("prod")
public class ProdDataInitializer implements ApplicationRunner {
    private final UtilRepository utilRepository;
    private final EntityManager entityManager;

    public ProdDataInitializer(UtilRepository utilRepository, EntityManager entityManager) {
        this.utilRepository = utilRepository;
        this.entityManager = entityManager;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Prod용 초기 데이터 로딩 코드 작성
    }
}
