package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.*;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
public class APIController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/offers")
    public List<Offer> getAllOffers() {
        return jdbcTemplate.query("SELECT * FROM offer", BeanPropertyRowMapper.newInstance(Offer.class));
    }
}
