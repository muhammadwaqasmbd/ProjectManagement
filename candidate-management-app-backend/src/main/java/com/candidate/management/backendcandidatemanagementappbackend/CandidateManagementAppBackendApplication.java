package com.candidate.management.backendcandidatemanagementappbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@EntityScan(basePackages = {"com.candidate.management.backendcandidatemanagementappbackend.model"})
@SpringBootApplication
public class CandidateManagementAppBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CandidateManagementAppBackendApplication.class, args);
	}

}
