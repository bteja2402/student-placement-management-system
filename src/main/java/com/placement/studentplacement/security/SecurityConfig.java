package com.placement.studentplacement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(cors -> {})

            .authorizeHttpRequests(auth -> auth

                .requestMatchers(HttpMethod.GET, "/students/**")
                .authenticated()

                .requestMatchers(HttpMethod.POST, "/students/**")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PUT, "/students/**")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.PATCH, "/students/**")
                .hasRole("ADMIN")

                .requestMatchers(HttpMethod.DELETE, "/students/**")
                .hasRole("ADMIN")

                .anyRequest()
                .permitAll()
            )

            .httpBasic(httpBasic -> {});

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                    "http://127.0.0.1:5500",
                    "http://localhost:5500"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE",
                    "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                    "Authorization",
                    "Content-Type"
                )
        );

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}