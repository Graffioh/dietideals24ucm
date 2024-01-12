package com.ucm.serverdietideals24.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.Models.Auction;
import com.ucm.serverdietideals24.DAO.AuctionDAO;

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

    // @PutMapping("/update-profile")
    // public void updateUserAccount(@RequestParam String id, @RequestBody
    // UserAccount entity) {
    // userAccountDAO.update(id, entity);
    // }

}
