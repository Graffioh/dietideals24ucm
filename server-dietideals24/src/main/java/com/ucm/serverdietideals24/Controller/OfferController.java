package com.ucm.serverdietideals24.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.DAO.OfferDAO;
import com.ucm.serverdietideals24.Models.Offer;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "https://dietideals24.vercel.app",
        "https://dietideals24-git-deploy-render-vercel-graffioh.vercel.app" }, allowCredentials = "true")
@RequestMapping("/offers")
public class OfferController {
    private final OfferDAO offerDAO;

    public OfferController(OfferDAO offerDAO) {
        this.offerDAO = offerDAO;
    }

    @PostMapping("/insert")
    public ResponseEntity<Offer> createOffer(@RequestBody Offer entity) {
        try {
            offerDAO.create(entity);

            return new ResponseEntity<Offer>(entity, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Offer>(new Offer(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<List<Offer>> fetchOffersBasedOnAuctionId(@PathVariable String auctionId) {
        try {
            List<Offer> offers = offerDAO.getAllViaAuctionId(auctionId);

            return ResponseEntity.ok(offers);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @GetMapping("/highest-offer/{auctionId}")
    public ResponseEntity<Offer> fetchHighestOffererIdBasedOnAuctionId(@PathVariable String auctionId) {
        try {
            Offer highestOffererId = offerDAO.getHighestOffererIdViaAuctionId(auctionId);

            return ResponseEntity.ok(highestOffererId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
