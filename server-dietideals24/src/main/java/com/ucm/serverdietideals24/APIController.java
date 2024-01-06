package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.*;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
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

import com.ucm.serverdietideals24.Auth.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class APIController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // User from DB
    // *************************************************************
    @GetMapping("/users")
    public ResponseEntity<List<UserAccount>> fetchAllUsers() {
        try {
            List<UserAccount> users = jdbcTemplate.query("SELECT * FROM useraccount",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class));
            
            return new ResponseEntity<List<UserAccount>>(users, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<List<UserAccount>>(new ArrayList<UserAccount>(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user-from-email")
    public ResponseEntity<UserAccount> fetchUserBasedOnEmail(@RequestParam String email) {
        try {
            UserAccount user = jdbcTemplate.query("SELECT * FROM useraccount WHERE email = '" + email + "'",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
            
            return new ResponseEntity<UserAccount>(user, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<UserAccount>(new UserAccount(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user-from-username")
    public ResponseEntity<UserAccount> fetchUserBasedOnUsername(@RequestParam String username) {
        try {
            UserAccount user = jdbcTemplate.query("SELECT * FROM useraccount WHERE username = '" + username + "'",
                    new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
            
            return new ResponseEntity<UserAccount>(user, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<UserAccount>(new UserAccount(), HttpStatus.BAD_REQUEST);
        }
    }
    // *************************************************************

    // JWT Token handling
    // *************************************************************
    @PostMapping("/generate-login-token")
    public ResponseEntity<String> generateLoginToken(@RequestBody UserFromLoginForm loginReq) {
        Long userId = -1L;

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
    public ResponseEntity<String> getSubjectFromToken(@RequestBody String token) {
        String subject = "";

        try {
            subject = JwtUtil.extractSubjectViaToken(token);
        } catch (Exception e) {
            return new ResponseEntity<String>("none", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<String>(subject, HttpStatus.ACCEPTED);
    }
    // *************************************************************

    // Auth
    // *************************************************************
    @GetMapping("/oauth-user")
    public OAuth2User oauthUser(@AuthenticationPrincipal OAuth2User principal) {
        return principal;
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> createUserAccount(@RequestBody UserAccount entity) {
        jdbcTemplate.execute("INSERT INTO useraccount VALUES('" + entity.getId() + "', '" + entity.getFirstName()
                + "', '" + entity.getLastName() + "', '" + entity.getUsername() + "', '" + entity.getPassword()
                + "', '"
                + entity.getBirthDate() + "', '" + entity.getEmail() + "')");

        return new ResponseEntity<UserAccount>(entity, HttpStatus.CREATED);
    }

    @PutMapping("/update-profile")
    public void updateUserAccount(@RequestParam String id, @RequestBody UserAccount entity) {
        jdbcTemplate.update("UPDATE useraccount SET firstName = '" + entity.getFirstName() + "', lastName = '"
                + entity.getLastName() + "', username = '" + entity.getUsername() + "', password = '"
                + entity.getPassword() + "', birthDate = '" + entity.getBirthDate() + "', email = '" + entity.getEmail()
                + "', piva = '" + entity.getPiva() + "', telephoneNumber = '" + entity.getTelephoneNumber()
                + "', biography = '" + entity.getBiography() + "', website = '" + entity.getWebsite() + "' WHERE id = '"
                + id + "'");
    }
    // *************************************************************

}
