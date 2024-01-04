package com.ucm.serverdietideals24;

import java.lang.reflect.InvocationTargetException;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class AppConfig {
    // @Bean
    // JdbcTemplate jdbcTemplate2() throws IllegalAccessException, InvocationTargetException, InstantiationException {
    //     // extract this 4 parameters using your own logic
    //     final String driverClassName = "com.ucm.Driver";
    //     final String jdbcUrl = "jdbc:postgresql://ep-wild-violet-14823380.eu-central-1.aws.neon.tech/dietideals24DB?user=Graffioh&password=8g4dRXucyKPG&sslmode=require";
    //     final String username = "Graffioh";
    //     final String password = "8g4dRXucyKPG";
    //     // or using DataSourceBuilder:
    //     final DataSource dataSource = DataSourceBuilder.create().driverClassName(driverClassName).url(jdbcUrl)
    //             .username(username).password(password).build();
    //     // and make the jdbcTemplate
    //     return new JdbcTemplate(dataSource);
    // }
}
