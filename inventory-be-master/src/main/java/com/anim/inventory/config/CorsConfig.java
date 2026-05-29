package com.anim.inventory.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${CORS_ALLOWED_ORIGINS:http://localhost:4200,http://localhost}")
    private String allowedOrigins;

    @Value("${CORS_ALLOWED_ORIGIN_PATTERNS:https://*.onrender.com}")
    private String allowedOriginPatterns;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        var mapping = registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .allowedHeaders("*");

        if (StringUtils.hasText(allowedOrigins)) {
            mapping.allowedOrigins(allowedOrigins.split(","));
        }
        if (StringUtils.hasText(allowedOriginPatterns)) {
            mapping.allowedOriginPatterns(allowedOriginPatterns.split(","));
        }
    }
}
