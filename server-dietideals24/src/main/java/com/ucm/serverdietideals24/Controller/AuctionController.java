package com.ucm.serverdietideals24.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.Models.Auction;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuctionController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/auctions")
    public ResponseEntity<List<Auction>> fetchAllAuctions() {
        try {
            List<Auction> auctions = jdbcTemplate.query("SELECT * from auctiontest",
                    new BeanPropertyRowMapper<Auction>(Auction.class));

            return new ResponseEntity<List<Auction>>(auctions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<List<Auction>>(new ArrayList<Auction>(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/auction-from-id")
    public ResponseEntity<Auction> fetchAuctionBasedOnId(@RequestParam String id) {
        try {
            Auction auction = jdbcTemplate.query("SELECT * FROM auctiontest WHERE id = '" + id + "'",
                    new BeanPropertyRowMapper<Auction>(Auction.class)).getFirst();

            return new ResponseEntity<Auction>(auction, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Auction>(new Auction(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/insert-auction")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction entity) {
        try {
            // Different query based on auction type
            if (entity.getAuctionType().toString() == "english") {
                jdbcTemplate.execute(
                        "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, baseStartAuction, raiseThreshold, idUserAccount, offerTimer, auctionType) VALUES ('"
                                + entity.getId() + "', '" + entity.getAuctionDescription()
                                + "', '" + entity.getAuctionName() + "', '" + entity.getAuctionCategory() + "', '"
                                + entity.getAuctionQuality() + "', '"
                                + entity.getCurrentOffer() + "', '" + entity.getAuctionImages() + "', '"
                                + entity.getBaseStartAuction() + "', '" + entity.getRaiseThreshold() + "', '"
                                + entity.getIdUserAccount() + "', '"
                                + entity.getOfferTimer() + "', '" + entity.getAuctionType() + "')");
            } else if (entity.getAuctionType().toString() == "fixedtime") {
                jdbcTemplate.execute(
                        "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, expireDate, minimumPrice, idUserAccount, auctionType) VALUES ('"
                                + entity.getId() + "', '" + entity.getAuctionDescription()
                                + "', '" + entity.getAuctionName() + "', '" + entity.getAuctionCategory() + "', '"
                                + entity.getAuctionQuality() + "', '"
                                + entity.getCurrentOffer() + "', '" + entity.getAuctionImages() + "', '"
                                + entity.getExpireDate() + "', '" + entity.getMinimumPrice() + "', '"
                                + entity.getIdUserAccount() + "', '"
                                + entity.getAuctionType() + "')");

            } else {
                jdbcTemplate.execute(
                        "INSERT INTO auction (id, auctionDescription, auctionName, auctionCategory, auctionQuality, currentOffer, auctionImages, startPrice, timer, decrementAmount, minimumPrice, expireTime, idUserAccount, auctionType) VALUES ('"
                                + entity.getId() + "', '" + entity.getAuctionDescription()
                                + "', '" + entity.getAuctionName() + "', '" + entity.getAuctionCategory() + "', '"
                                + entity.getAuctionQuality() + "', '"
                                + entity.getCurrentOffer() + "', '" + entity.getAuctionImages() + "', '"
                                + entity.getStartPrice() + "', '" + entity.getTimer()
                                + "', '" + entity.getDecrementAmount() + "', '" + entity.getMinimumPrice() + "', '"
                                + entity.getExpireTime() + "', '" + entity.getIdUserAccount() + "', '"
                                + entity.getAuctionType() + "')");

            }

            return new ResponseEntity<Auction>(entity, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Auction>(new Auction(), HttpStatus.BAD_REQUEST);
        }

    }

    // @PutMapping("/update-profile")
    // public void updateUserAccount(@RequestParam String id, @RequestBody
    // UserAccount entity) {
    // userAccountDAO.update(id, entity);
    // }

}
