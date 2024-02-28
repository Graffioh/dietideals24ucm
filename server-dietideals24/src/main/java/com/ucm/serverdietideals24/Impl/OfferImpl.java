package com.ucm.serverdietideals24.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ucm.serverdietideals24.DAO.OfferDAO;
import com.ucm.serverdietideals24.Models.Auction;
import com.ucm.serverdietideals24.Models.Offer;

@Repository
public class OfferImpl implements OfferDAO {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public void create(Offer placeOffer) {
        jdbcTemplate.execute("INSERT INTO offer (id, offerAmount, idUserAccount, idAuction) VALUES ('"
                + placeOffer.getId() + "', '" + placeOffer.getOfferAmount() + "', '" + placeOffer.getIdUserAccount()
                + "', '" + placeOffer.getIdAuction() + "')");
        new BeanPropertyRowMapper<Auction>(Auction.class);
    }

}
