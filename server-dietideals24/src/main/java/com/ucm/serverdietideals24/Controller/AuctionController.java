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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.Models.Auction;
import com.ucm.serverdietideals24.DAO.AuctionDAO;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/auctions")
public class AuctionController {
    @Autowired
    private AuctionDAO auctionDAO;

    @GetMapping
    public ResponseEntity<List<Auction>> fetchAllAuctions() {
        try {
            List<Auction> auctions = auctionDAO.getAll();

            return ResponseEntity.ok(auctions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }
    
    @PostMapping("/name")
    public ResponseEntity<List<Auction>> fetchAuctionBasedOnName(@RequestBody String name) {
        try {
            List<Auction> auctions = auctionDAO.getViaName(name);

            return new ResponseEntity<List<Auction>>(auctions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<List<Auction>>(new ArrayList<Auction>(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/paginated")
    public ResponseEntity<List<Auction>> fetchPagedAuctions(@RequestParam int page) {
        try {
            List<Auction> auctions = auctionDAO.getAllPaginated(page);

            return ResponseEntity.ok(auctions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @GetMapping("/paginated/user/{userId}")
    public ResponseEntity<List<Auction>> fetchPaginatedUsersAuctions(@PathVariable Long userId, @RequestParam int page) {
        try {
            List<Auction> auctions = auctionDAO.getAllPaginatedViaUserId(userId, page);

            return ResponseEntity.ok(auctions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @GetMapping("/paginated/from-offers/{userId}")
    public ResponseEntity<List<Auction>> fetchPaginatedUsersAuctionsFromOffers(@PathVariable Long userId, @RequestParam int page) {
        try {
            List<Auction> auctions = auctionDAO.getAllPaginatedViaOffers(userId, page);

            return ResponseEntity.ok(auctions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Auction>> fetchAllAuctionsBasedOnUserId(@PathVariable Long userId) {
        try {
            List<Auction> auctions = auctionDAO.getAllViaUserId(userId);
            return ResponseEntity.ok(auctions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> fetchAuctionBasedOnId(@PathVariable Long id) {
        try {
            Auction auction = auctionDAO.getViaId(id);
            return ResponseEntity.ok(auction);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Auction());
        }
    }

    @PostMapping
    public ResponseEntity<Auction> createAuction(@RequestBody Auction entity) {
        try {
            auctionDAO.create(entity);
            return ResponseEntity.status(HttpStatus.CREATED).body(entity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Auction());
        }
    }

    @PutMapping("/{id}/is-over")
    public ResponseEntity<Void> setAuctionIsOver(@PathVariable Long id) {
        try {
            auctionDAO.updateIsOver(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/current-offer")
    public ResponseEntity<Void> setAuctionCurrentOffer(@PathVariable Long id, @RequestParam Float newCurrentOffer) {
        try {
            auctionDAO.updateCurrentOffer(id, newCurrentOffer);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/current-offertimer")
    public ResponseEntity<Void> setCurrentOfferTimer(@PathVariable Long id, @RequestParam Time newTimerValue) {
        try {
            auctionDAO.updateCurrentOfferTimer(id, newTimerValue);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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

    @Scheduled(fixedRate = 1000)
    public void englishAuctionTimerReduction() {
        List<Auction> auctions = auctionDAO.getAllEnglishAuctions();

        for (Auction auction : auctions) {
            if(auction.getIsOver() == false) {
                if (auction.getCurrentOfferTimer().equals(Time.valueOf("00:00:00"))) {
                    setCurrentOfferTimer(auction.getId(), Time.valueOf("00:00:00"));
                } else {
                    setCurrentOfferTimer(auction.getId(), decrementTimerBy1Second(auction));
                }
            }
        }
    }

    private void setCurrentDecrementTimer(Long id, Time newTimerValue) {
        try {
            auctionDAO.updateCurrentDecrementTimer(id, newTimerValue);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Time decrementTimerBy1Second(Auction auction) {
        LocalTime cdtLocalTime = auction.getAuctionType().name().equals("descending")
                ? auction.getCurrentDecrementTimer().toLocalTime()
                : auction.getCurrentOfferTimer().toLocalTime();
        LocalTime cdtDecrementedLocalTime = cdtLocalTime.minusSeconds(1);
        Time newDecrementTimerValue = Time.valueOf(cdtDecrementedLocalTime);

        return newDecrementTimerValue;
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
