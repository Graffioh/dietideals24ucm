package com.ucm.serverdietideals24.Impl;

import java.sql.Time;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ucm.serverdietideals24.DAO.AuctionDAO;
import com.ucm.serverdietideals24.Models.Auction;

@Repository
public class AuctionImpl implements AuctionDAO {
    private final JdbcTemplate jdbcTemplate;

    public AuctionImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Auction> getAll() {
        return jdbcTemplate.query("SELECT * FROM auction ORDER BY id",
                new BeanPropertyRowMapper<Auction>(Auction.class));
    }

    @Override
    public List<Auction> getViaName(String name) {
        String sql = "SELECT * FROM auction WHERE LOWER(auctionName) LIKE LOWER(?) ORDER BY id";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class), "%" + name + "%");
    }

    @Override
    public List<Auction> getViaCategory(String category) {
        String sql = "SELECT * FROM auction WHERE auctionCategory = ?::auctioncategory ORDER BY id";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class), category);
    }

    @Override
    public List<Auction> getAllViaUserId(Long userId) {
        String sql = "SELECT * FROM auction WHERE idUserAccount = ? ORDER BY id";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class), userId);
    }

    @Override
    public List<Auction> getAllPaginated(int pageNumber) {
        int offset = (pageNumber - 1) * 20;
        String sql = "SELECT * FROM auction ORDER BY id LIMIT 20 OFFSET ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class), offset);
    }

    @Override
    public List<Auction> getAllPaginatedViaUserId(Long userId, int pageNumber) {
        int offset = (pageNumber - 1) * 8;
        String sql = "SELECT * FROM auction WHERE idUserAccount = ? ORDER BY id LIMIT 8 OFFSET ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class), userId, offset);
    }

    @Override
    public List<Auction> getAllPaginatedViaOffers(Long userId, int pageNumber) {
        int offset = (pageNumber - 1) * 8;
        String sql = "SELECT DISTINCT a.* FROM auction a JOIN offer o ON a.id = o.idAuction WHERE o.idUserAccount = ? ORDER BY id LIMIT 8 OFFSET ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class), userId, offset);
    }

    @Override
    public Auction getViaId(Long id) {
        String sql = "SELECT * FROM auction WHERE id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class), id).stream().findFirst()
                .orElse(null);
    }

    @Override
    public List<Auction> getAllDescendingAuctions() {
        String sql = "SELECT * FROM auction WHERE auctionType = 'descending' ORDER BY id";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class));
    }

    @Override
    public List<Auction> getAllEnglishAuctions() {
        String sql = "SELECT * FROM auction WHERE auctionType = 'english' ORDER BY id";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Auction.class));
    }

    // Delete auction, delete offers, don't delete notifications
    // 1) SET in notification idauction NOT NULL
    // 2) FOREIGN KEY (auction_id) REFERENCES auction(id) ON DELETE CASCADE
    // 3) FOREIGN KEY (auction_id) REFERENCES auction(id) ON DELETE SET NULL
    @Override
    public void delete(Long auctionId) {
        String sql = "DELETE FROM auction WHERE id = ?::bigint";
        jdbcTemplate.update(sql, auctionId);
    }

    @Override
    public void create(Auction auction) {
        // Different query based on auction type
        String sql;
        Object[] args;

        if (auction.getAuctionType().toString().equals("english")) {
            sql = "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, startPrice, riseThreshold, idUserAccount, baseTimer, auctionType, currentTimer) VALUES (?, ?, ?, ?::auctioncategory, ?, ?, ?, ?, ?, ?, ?, ?::auctiontype, ?)";
            args = new Object[] {
                    auction.getId(),
                    auction.getAuctionDescription(),
                    auction.getAuctionName(),
                    auction.getAuctionCategory().name(),
                    auction.getAuctionQuality(),
                    auction.getCurrentOffer(),
                    auction.getAuctionImages(),
                    auction.getStartPrice(),
                    auction.getRiseThreshold(),
                    auction.getIdUserAccount(),
                    auction.getBaseTimer(),
                    auction.getAuctionType().name(),
                    auction.getBaseTimer()
            };
        } else if (auction.getAuctionType().toString().equals("fixedtime")) {
            sql = "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, expireDate, minimumAcceptablePrice, expireTime, idUserAccount, auctionType) VALUES (?, ?, ?, ?::auctioncategory, ?, ?, ?, ?, ?, ?, ?, ?::auctiontype)";
            args = new Object[] {
                    auction.getId(),
                    auction.getAuctionDescription(),
                    auction.getAuctionName(),
                    auction.getAuctionCategory().name(),
                    auction.getAuctionQuality(),
                    auction.getCurrentOffer(),
                    auction.getAuctionImages(),
                    auction.getExpireDate(),
                    auction.getMinimumAcceptablePrice(),
                    auction.getExpireTime(),
                    auction.getIdUserAccount(),
                    auction.getAuctionType().name()
            };
        } else {
            sql = "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, startPrice, baseTimer, decrementAmount, endPrice, idUserAccount, auctionType, currentTimer) VALUES (?, ?, ?, ?::auctioncategory, ?, ?, ?, ?, ?, ?, ?, ?, ?::auctiontype, ?)";
            args = new Object[] {
                    auction.getId(),
                    auction.getAuctionDescription(),
                    auction.getAuctionName(),
                    auction.getAuctionCategory().name(),
                    auction.getAuctionQuality(),
                    auction.getStartPrice(),
                    auction.getAuctionImages(),
                    auction.getStartPrice(),
                    auction.getBaseTimer(),
                    auction.getDecrementAmount(),
                    auction.getEndPrice(),
                    auction.getIdUserAccount(),
                    auction.getAuctionType().name(),
                    auction.getBaseTimer()
            };
        }

        jdbcTemplate.update(sql, args);
    }

    @Override
    public void updateIsOver(Long id) {
        String sql = "UPDATE auction SET isOver = true WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    @Override
    public void updateCurrentOffer(Long id, Float newCurrentOffer) {
        String sql = "UPDATE auction SET currentOffer = ? WHERE id = ?";
        jdbcTemplate.update(sql, newCurrentOffer, id);
    }

    @Override
    public void updateCurrentTimer(Long id, Time newTimerValue) {
        String sql = "UPDATE auction SET currentTimer = ? WHERE id = ?";
        jdbcTemplate.update(sql, newTimerValue, id);
    }

    @Override
    public Integer countAll() {
        String sql = "SELECT COUNT(*) FROM auction";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public Integer countAllViaUserId(Long userId) {
        String sql = "SELECT COUNT(*) FROM auction WHERE idUserAccount = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, userId);
    }

    @Override
    public Integer countAllViaOffersAndUserId(Long userId) {
        String sql = "SELECT COUNT(DISTINCT idAuction) AS total_auctions_offered FROM offer WHERE idUserAccount = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, userId);
    }
}
