package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.*;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
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
    JdbcTemplate jdbcTemplate;

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

    @PostMapping("/generate-login-token")
    public ResponseEntity<String> generateLoginToken(@RequestBody LoginRequest loginReq) {
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
        tokenCookie.setSecure(true); 
        tokenCookie.setHttpOnly(true);
        tokenCookie.setMaxAge(100000000);
        tokenCookie.setPath("/");

        response.addCookie(tokenCookie);

        return new ResponseEntity<String>("Cookie token set successfully.", HttpStatus.OK);
    }

    @PostMapping("/get-email-from-token")
    public ResponseEntity<String> getEmailFromToken(@RequestBody String token) {
        String email = "";

        try {
            email = JwtUtil.extractEmailViaToken(token);
        } catch (Exception e) {
            return new ResponseEntity<String>("none", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<String>(email, HttpStatus.ACCEPTED);
    }

    // @GetMapping("/get-login-token")
    // public ResponseEntity<String> getLoginToken(@CookieValue("token") String tokenFromCookie) {
    //     return new ResponseEntity<String>(tokenFromCookie, HttpStatus.OK);
    // }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> createUserAccount(@RequestBody UserAccount entity) {
        jdbcTemplate.execute("INSERT INTO useraccount VALUES('" + entity.getId() + "', '" + entity.getFirstName()
                + "', '" + entity.getLastName() + "', '" + entity.getUsername() + "', '" + entity.getPassword() + "', '"
                + entity.getBirthDate() + "', '" + entity.getEmail() + "')");

        return new ResponseEntity<UserAccount>(entity, HttpStatus.CREATED);
    }

    @PutMapping("/update-profile/{id}")
    public UserAccount updateUserAccount(@PathVariable String id, @RequestBody UserAccount entity) {

        return entity;
    }

}
