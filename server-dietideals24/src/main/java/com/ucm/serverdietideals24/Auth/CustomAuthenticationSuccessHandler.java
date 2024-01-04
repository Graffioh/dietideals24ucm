package com.ucm.serverdietideals24.Auth;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.Driver;
import java.util.NoSuchElementException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ucm.serverdietideals24.Auth.util.JwtUtil;
import com.ucm.serverdietideals24.Models.UserAccount;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Override
    protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {

        String emailOrUsernameFromOAuth = authentication.getName();

        String token = JwtUtil.generateToken(emailOrUsernameFromOAuth);
        Cookie tokenCookie = new Cookie("token", token);
        tokenCookie.setSecure(false);
        tokenCookie.setHttpOnly(false);
        tokenCookie.setMaxAge(1000000000);
        tokenCookie.setPath("/");

        response.addCookie(tokenCookie);

        // Use .env
        final String jdbcUrl = "jdbc:postgresql://ep-wild-violet-14823380.eu-central-1.aws.neon.tech/dietideals24DB?user=Graffioh&password=8g4dRXucyKPG&sslmode=require";
        final String username = "Graffioh";
        final String password = "8g4dRXucyKPG";
        final DataSource dataSource = DataSourceBuilder.create().url(jdbcUrl)
                .username(username).password(password).build();
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        
        Boolean isUserInDB = false;
        Boolean isEmail = false;
        
        if(emailOrUsernameFromOAuth.contains("@")) {
            isEmail = true;
        }
        
        if(isEmail) {
            try {
                jdbcTemplate.query("SELECT * FROM useraccount WHERE email = '" + emailOrUsernameFromOAuth + "'",
                        new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
                isUserInDB = true;
            } catch (NoSuchElementException e) {
                isUserInDB = false;
                System.out.println("No such user in the Database.");
            }
        } else {
            try {
                jdbcTemplate.query("SELECT * FROM useraccount WHERE username = '" + emailOrUsernameFromOAuth + "'",
                        new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
                isUserInDB = true;
            } catch (NoSuchElementException e) {
                isUserInDB = false;
                System.out.println("No such user in the Database.");
            }
        }

        
        String targetUrl = "";

        if(isEmail) {
            if (isUserInDB) {
                targetUrl = "http://localhost:3000/";
            } else {
                targetUrl = "http://localhost:3000/private-profile?email=" + emailOrUsernameFromOAuth +
                        "&fromProvider=google";
            }
        } else {
            if (isUserInDB) {
                targetUrl = "http://localhost:3000/";
            } else {
                targetUrl = "http://localhost:3000/private-profile?username=" + emailOrUsernameFromOAuth +
                        "&fromProvider=github";
            }
            
        }

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
