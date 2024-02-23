package com.helloutils.hellocode.common;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class DataInitializer implements ApplicationListener<ContextRefreshedEvent> {

    private final DataSource dataSource;

    public DataInitializer(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.addScript(new ClassPathResource("data.sql"));
        DatabasePopulatorUtils.execute(populator, dataSource);
    }
}
