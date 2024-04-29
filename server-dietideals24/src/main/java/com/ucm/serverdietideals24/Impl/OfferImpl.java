package com.ucm.serverdietideals24.Impl;

import java.util.List;

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
        String sql = "INSERT INTO offer (id, offerAmount, idUserAccount, idAuction) VALUES (?, ?, ?, ?)";
        Object[] args = {
                placeOffer.getId(),
                placeOffer.getOfferAmount(),
                placeOffer.getIdUserAccount(),
                placeOffer.getIdAuction()
        };
        jdbcTemplate.update(sql, args);
    }

    @Override
    public List<Offer> getAllViaAuctionId(String auctionId) {
        String sql = "SELECT * FROM offer WHERE idAuction = ?::bigint";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Offer.class), auctionId);
    }

    @Override
    public Offer getHighestOffererIdViaAuctionId(String auctionId) {
        return jdbcTemplate.query("SELECT * FROM offer WHERE idAuction = ?::bigint ORDER BY offeramount DESC LIMIT 1",
                new BeanPropertyRowMapper<Offer>(Offer.class), auctionId).getFirst();
    }

}
