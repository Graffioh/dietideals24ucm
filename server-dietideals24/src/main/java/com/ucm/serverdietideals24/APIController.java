package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.*;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController
public class APIController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @PostMapping("/register")
    public UserAccount createUserAccount(@RequestBody UserAccount entity) {
        jdbcTemplate.execute("INSERT INTO useraccount ");
        
        return entity;
    }
    
    @PutMapping("/update-profile/{id}")
    public UserAccount updateUserAccount(@PathVariable String id, @RequestBody UserAccount entity) {
        

        return entity;
    }
    
}
