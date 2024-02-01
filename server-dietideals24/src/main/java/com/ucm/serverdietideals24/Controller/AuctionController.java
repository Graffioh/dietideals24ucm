package com.ucm.serverdietideals24.Controller;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.Models.Auction;
import com.ucm.serverdietideals24.DAO.AuctionDAO;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuctionController {
    @Autowired
    private AuctionDAO auctionDAO;

    @GetMapping("/auctions")
    public ResponseEntity<List<Auction>> fetchAllAuctions() {
        try {
            List<Auction> auctions = auctionDAO.getAll();

            return new ResponseEntity<List<Auction>>(auctions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<List<Auction>>(new ArrayList<Auction>(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/auction-from-id")
    public ResponseEntity<Auction> fetchAuctionBasedOnId(@RequestParam Long id) {
        try {
            Auction auction = auctionDAO.getViaId(id);

            return new ResponseEntity<Auction>(auction, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Auction>(new Auction(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/insert-auction")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction entity) {
        try {
            auctionDAO.create(entity);

            return new ResponseEntity<Auction>(entity, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Auction>(new Auction(), HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/set-auction-isover")
    public void setAuctionIsOver(@RequestParam Long id) {
        try {
            auctionDAO.updateIsOver(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/set-auction-currentoffer")
    public void setAuctionCurrentOffer(@RequestParam Long id, @RequestParam Float newCurrentOffer) {
        try {
            auctionDAO.updateCurrentOffer(id, newCurrentOffer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Scheduled(fixedRate = 1000)
    public void descendingAuctionOfferReduction() {
        List<Auction> auctions = auctionDAO.getAllDescendingAuctions();

        for (Auction auction : auctions) {
            if (auction.getCurrentDecrementTimer().equals(Time.valueOf("00:00:00"))) {
                decreasePrice(auction);
                setCurrentDecrementTimer(auction.getId(), auction.getBaseDecrementTimer());
            } else {
                setCurrentDecrementTimer(auction.getId(), decrementTimerBy1Second(auction));
            }
        }
    }

    private Time decrementTimerBy1Second(Auction auction) {
        LocalTime cdtLocalTime = auction.getCurrentDecrementTimer().toLocalTime();
        LocalTime cdtDecrementedLocalTime = cdtLocalTime.minusSeconds(1);
        Time newDecrementTimerValue = Time.valueOf(cdtDecrementedLocalTime);

        return newDecrementTimerValue;
    }

    private void setCurrentDecrementTimer(Long id, Time newTimerValue) {
        try {
            auctionDAO.updateCurrentDecrementTimer(id, newTimerValue);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void decreasePrice(Auction auction) {
        if (auction.getIsOver() == false) {
            if (auction.getCurrentOffer() > auction.getMinimumPrice()) {
                if (auction.getCurrentOffer() > 0) {
                    auctionDAO.updateCurrentOffer(auction.getId(),
                            auction.getCurrentOffer() - auction.getDecrementAmount());
                } else {
                    auctionDAO.updateCurrentOffer(auction.getId(),
                            auction.getStartPrice() - auction.getDecrementAmount());
                }
            } else {
                auctionDAO.updateIsOver(auction.getId());
            }
        }
    }
}
