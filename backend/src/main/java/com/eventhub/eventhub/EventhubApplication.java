package com.eventhub.eventhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.eventhub.eventhub.entity")
@EnableJpaRepositories("com.eventhub.eventhub.repository")
public class EventhubApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventhubApplication.class, args);
    }
}
