package com.ucm.serverdietideals24.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ucm.serverdietideals24.DAO.AuctionDAO;
import com.ucm.serverdietideals24.Models.Auction;

@Repository
public class AuctionImpl implements AuctionDAO {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Auction> getAll() {
        return jdbcTemplate.query("SELECT * FROM auction",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public Auction getViaId(Long id) {
        return jdbcTemplate.query("SELECT * FROM auction WHERE id = '" + id + "'",
                new BeanPropertyRowMapper<Auction>(Auction.class)).getFirst();
    }

    @Override
    public void create(Auction auction) {
        // Different query based on auction type
        if (auction.getAuctionType().toString() == "english") {
            jdbcTemplate.execute(
                    "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, baseStartAuction, raiseThreshold, idUserAccount, offerTimer, auctionType) VALUES ('"
                            + auction.getId() + "', '" + auction.getAuctionDescription()
                            + "', '" + auction.getAuctionName() + "', '" + auction.getAuctionCategory() + "', '"
                            + auction.getAuctionQuality() + "', '"
                            + auction.getCurrentOffer() + "', '" + auction.getAuctionImages() + "', '"
                            + auction.getBaseStartAuction() + "', '" + auction.getRaiseThreshold() + "', '"
                            + auction.getIdUserAccount() + "', '"
                            + auction.getOfferTimer() + "', '" + auction.getAuctionType() + "')");
        } else if (auction.getAuctionType().toString() == "fixedtime") {
            jdbcTemplate.execute(
                    "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, expireDate, minimumPrice, expireTime, idUserAccount, auctionType) VALUES ('"
                            + auction.getId() + "', '" + auction.getAuctionDescription()
                            + "', '" + auction.getAuctionName() + "', '" + auction.getAuctionCategory() + "', '"
                            + auction.getAuctionQuality() + "', '"
                            + auction.getCurrentOffer() + "', '" + auction.getAuctionImages() + "', '"
                            + auction.getExpireDate() + "', '" + auction.getMinimumPrice() + "', '"
                            + auction.getExpireTime() + "','"
                            + auction.getIdUserAccount() + "', '"
                            + auction.getAuctionType() + "')");

        } else {
            jdbcTemplate.execute(
                    "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, startPrice, decrementTimer, decrementAmount, minimumPrice, idUserAccount, auctionType) VALUES ('"
                            + auction.getId() + "', '" + auction.getAuctionDescription()
                            + "', '" + auction.getAuctionName() + "', '" + auction.getAuctionCategory() + "', '"
                            + auction.getAuctionQuality() + "', '"
                            + auction.getCurrentOffer() + "', '" + auction.getAuctionImages() + "', '"
                            + auction.getStartPrice() + "', '" + auction.getDecrementTimer()
                            + "', '" + auction.getDecrementAmount() + "', '" + auction.getMinimumPrice() + "', '"
                            + auction.getIdUserAccount() + "', '"
                            + auction.getAuctionType() + "')");
        }
    }

}
