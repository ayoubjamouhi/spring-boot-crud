package com.ayoubjamouhi.demo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfig {
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository) {
            return args -> {
                Student maryam = new Student("ayoub",
                        "test@gmail.com",
                        LocalDate.of(1995, Month.AUGUST, 28));
                Student alex = new Student("alex",
                        "alex@gmail.com",
                        LocalDate.of(2004, Month.AUGUST, 28));
                studentRepository.saveAll(List.of(maryam, alex));
            };
    }
}
