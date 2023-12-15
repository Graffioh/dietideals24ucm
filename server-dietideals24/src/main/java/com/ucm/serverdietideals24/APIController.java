package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.*;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;



@RestController
public class APIController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    @GetMapping("/auction-test")
    public List<Auction> getAuctionsTest() {
        return jdbcTemplate.query("SELECT * from auctiontest", new BeanPropertyRowMapper<Auction>(Auction.class));
    }
    
}
