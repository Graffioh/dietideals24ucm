package com.ucm.serverdietideals24.Impl;

import java.sql.Time;
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
        return jdbcTemplate.query("SELECT * FROM auction ORDER BY id",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getViaName(String name) {
        return jdbcTemplate.query("SELECT * FROM auction WHERE auctionName = '" + name + "' ORDER BY id",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getViaCategory(String category) {
        return jdbcTemplate.query("SELECT * FROM auction WHERE auctionCategory = '" + category + "' ORDER BY id",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getAllViaUserId(Long userId) {
        return jdbcTemplate.query("SELECT * FROM auction WHERE idUserAccount = '" + userId + "' ORDER BY id",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getAllPaginated(int pageNumber) {
        int offset = (pageNumber - 1) * 20;
        return jdbcTemplate.query("SELECT * FROM auction ORDER BY id LIMIT 20 OFFSET " + offset,
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getAllPaginatedViaUserId(Long userId, int pageNumber) {
        int offset = (pageNumber - 1) * 8;
        return jdbcTemplate.query(
                "SELECT * FROM auction WHERE idUserAccount = " + userId + "ORDER BY id LIMIT 8 OFFSET " + offset,
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getAllPaginatedViaOffers(Long userId, int pageNumber) {
        int offset = (pageNumber - 1) * 8;
        return jdbcTemplate.query(
                "SELECT DISTINCT a.* FROM auction a JOIN offer o ON a.id = o.idAuction WHERE o.idUserAccount = "
                        + userId
                        + "ORDER BY id LIMIT 8 OFFSET " + offset,
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public Auction getViaId(Long id) {
        return jdbcTemplate.query("SELECT * FROM auction WHERE id = '" + id + "'",
                new BeanPropertyRowMapper<Auction>(Auction.class)).getFirst();
    }

    @Override
    public List<Auction> getAllDescendingAuctions() {
        return jdbcTemplate.query("SELECT * FROM auction WHERE auctionType = 'descending' ORDER BY id",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getAllEnglishAuctions() {
        return jdbcTemplate.query("SELECT * FROM auction WHERE auctionType = 'english' ORDER BY id",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public void create(Auction auction) {
        // Different query based on auction type
        if (auction.getAuctionType().toString() == "english") {
            jdbcTemplate.execute(
                    "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, startPrice, raiseThreshold, idUserAccount, baseTimer, auctionType, currentTimer) VALUES ('"
                            + auction.getId() + "', '" + auction.getAuctionDescription()
                            + "', '" + auction.getAuctionName() + "', '" + auction.getAuctionCategory() + "', '"
                            + auction.getAuctionQuality() + "', '"
                            + auction.getCurrentOffer() + "', '" + auction.getAuctionImages() + "', '"
                            + auction.getStartPrice() + "', '" + auction.getRaiseThreshold() + "', '"
                            + auction.getIdUserAccount() + "', '"
                            + auction.getBaseTimer() + "', '" + auction.getAuctionType() + "', '"
                            + auction.getBaseTimer() + "')");
        } else if (auction.getAuctionType().toString() == "fixedtime") {
            jdbcTemplate.execute(
                    "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, expireDate, minimumAcceptablePrice, expireTime, idUserAccount, auctionType) VALUES ('"
                            + auction.getId() + "', '" + auction.getAuctionDescription()
                            + "', '" + auction.getAuctionName() + "', '" + auction.getAuctionCategory() + "', '"
                            + auction.getAuctionQuality() + "', '"
                            + auction.getCurrentOffer() + "', '" + auction.getAuctionImages() + "', '"
                            + auction.getExpireDate() + "', '" + auction.getMinimumAcceptablePrice() + "', '"
                            + auction.getExpireTime() + "','"
                            + auction.getIdUserAccount() + "', '"
                            + auction.getAuctionType() + "')");

        } else {
            jdbcTemplate.execute(
                    "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, startPrice, baseTimer, decrementAmount, endPrice, idUserAccount, auctionType, currentTimer) VALUES ('"
                            + auction.getId() + "', '" + auction.getAuctionDescription()
                            + "', '" + auction.getAuctionName() + "', '" + auction.getAuctionCategory() + "', '"
                            + auction.getAuctionQuality() + "', '"
                            + auction.getStartPrice() + "', '" + auction.getAuctionImages() + "', '"
                            + auction.getStartPrice() + "', '" + auction.getBaseTimer()
                            + "', '" + auction.getDecrementAmount() + "', '" + auction.getEndPrice() + "', '"
                            + auction.getIdUserAccount() + "', '"
                            + auction.getAuctionType() + "', '" + auction.getBaseTimer() + "')");
        }
    }

    @Override
    public void updateIsOver(Long id) {
        jdbcTemplate.update("UPDATE auction SET isOver = 'true' WHERE id = " + id);
    }

    @Override
    public void updateCurrentOffer(Long id, Float newCurrentOffer) {
        jdbcTemplate.update("UPDATE auction SET currentOffer = '" + newCurrentOffer + "' WHERE id = " + id);
    }

    @Override
    public void updateCurrentDecrementTimer(Long id, Time newTimerValue) {
        jdbcTemplate.update("UPDATE auction SET currentTimer = '" + newTimerValue + "' WHERE id = " + id);
    }

    @Override
    public void updateCurrentOfferTimer(Long id, Time newTimerValue) {
        jdbcTemplate.update("UPDATE auction SET currentTimer = '" + newTimerValue + "' WHERE id = " + id);
    }

    @Override
    public Integer countAll() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM auction", Integer.class);
    }

    @Override
    public Integer countAllViaUserId(Long userId) {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM auction WHERE idUserAccount = " + userId,
                Integer.class);
    }

    @Override
    public Integer countAllViaOffersAndUserId(Long userId) {
        return jdbcTemplate.queryForObject(
                "SELECT COUNT(DISTINCT idAuction) AS total_auctions_offered FROM offer WHERE idUserAccount = " + userId,
                Integer.class);
    }
}
