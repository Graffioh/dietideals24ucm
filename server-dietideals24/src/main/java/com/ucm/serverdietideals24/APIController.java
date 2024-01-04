package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.*;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ucm.serverdietideals24.Auth.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class APIController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/users")
    public List<UserAccount> fetchAllUsers() {
        return jdbcTemplate.query("SELECT * FROM useraccount",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class));
    }

    @GetMapping("/user")
    public UserAccount fetchUserBasedOnEmail(@RequestParam String email) {
        return jdbcTemplate.query("SELECT * FROM useraccount WHERE email = '" + email + "'",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
    }

    @GetMapping("/oauth-user")
    // public Map<String, Object> oauthUser(@AuthenticationPrincipal OAuth2User principal) {
    //     return Collections.singletonMap("name", principal.getAttribute("name"));
    public OAuth2User oauthUser(@AuthenticationPrincipal OAuth2User principal) {
        return principal;
    }

    @PostMapping("/generate-login-token")
    public ResponseEntity<String> generateLoginToken(@RequestBody UserFromLoginForm loginReq) {
        int userId = -1;

        try {
            userId = jdbcTemplate.query(
                    "SELECT id FROM useraccount WHERE email = '" + loginReq.getEmail() + "' AND password = '"
                            + loginReq.getPassword() + "'",
                    new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst().getId();
        } catch (NoSuchElementException e) {
            System.out.println("Error, invalid email or password sento to login route.");
        }

        if (userId != -1) {
            String token = JwtUtil.generateToken(loginReq.getEmail());
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }

        return new ResponseEntity<String>("none", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/set-login-token")
    public ResponseEntity<String> setLoginToken(@RequestBody String token, HttpServletResponse response) {
        Cookie tokenCookie = new Cookie("token", token);
        tokenCookie.setSecure(false);
        tokenCookie.setHttpOnly(false);
        tokenCookie.setMaxAge(100000000);
        tokenCookie.setPath("/");

        response.addCookie(tokenCookie);

        return new ResponseEntity<String>("Cookie token set successfully.", HttpStatus.OK);
    }
    
    @GetMapping("/get-login-token")
    public ResponseEntity<String> getLoginToken(@CookieValue(name = "token", required = false) String tokenFromCookie) {
        if (tokenFromCookie != null) {
            return new ResponseEntity<String>(tokenFromCookie, HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("no-token", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/delete-login-token")
    public ResponseEntity<String> deleteLoginToken(HttpServletResponse response) {
        Cookie tokenCookie = new Cookie("token", null);
        tokenCookie.setSecure(false);
        tokenCookie.setHttpOnly(false);
        tokenCookie.setMaxAge(0);
        tokenCookie.setPath("/");

        response.addCookie(tokenCookie);

        return new ResponseEntity<String>("Cookie token delete successfully.", HttpStatus.OK);
    }

    @PostMapping("/get-subject-from-token")
    public ResponseEntity<String> getEmailFromToken(@RequestBody String token) {
        String subject = "";

        try {
            subject = JwtUtil.extractSubjectViaToken(token);
        } catch (Exception e) {
            return new ResponseEntity<String>("none", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<String>(subject, HttpStatus.ACCEPTED);
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> createUserAccount(@RequestBody UserAccount entity) {
        jdbcTemplate.execute("INSERT INTO useraccount VALUES('" + entity.getId() + "', '" + entity.getFirstName()
                + "', '" + entity.getLastName() + "', '" + entity.getUsername() + "', '" + entity.getPassword()
                + "', '"
                + entity.getBirthDate() + "', '" + entity.getEmail() + "')");

        return new ResponseEntity<UserAccount>(entity, HttpStatus.CREATED);
    }

    @PutMapping("/update-profile/{id}")
    public UserAccount updateUserAccount(@PathVariable String id, @RequestBody UserAccount entity) {

        return entity;
    }

}
