package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.*;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class APIController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/users")
    public List<UserAccount> fetchAllUsers() {
        return jdbcTemplate.query("SELECT * FROM useraccount",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class));
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> createUserAccount(@RequestBody UserAccount entity) {
        jdbcTemplate.execute("INSERT INTO useraccount VALUES('" + entity.getId() + "', '" + entity.getFirstName()
                + "', '" + entity.getLastName() + "', '" + entity.getUsername() + "', '" + entity.getPassword() + "', '"
                + entity.getBirthDate() + "', '" + entity.getMail() + "')");

        return new ResponseEntity<UserAccount>(entity, HttpStatus.CREATED);
    }

    @PutMapping("/update-profile/{id}")
    public UserAccount updateUserAccount(@PathVariable String id, @RequestBody UserAccount entity) {

        return entity;
    }

}
