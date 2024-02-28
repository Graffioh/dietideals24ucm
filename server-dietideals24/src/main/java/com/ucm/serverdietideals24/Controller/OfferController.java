package com.ucm.serverdietideals24.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.DAO.OfferDAO;
import com.ucm.serverdietideals24.Models.Offer;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OfferController {
    @Autowired
    private OfferDAO offerDAO;

    @PostMapping("/insert-offer")
    public ResponseEntity<Offer> createOffer(@RequestBody Offer entity) {
        try {
            offerDAO.create(entity);

            return new ResponseEntity<Offer>(entity, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Offer>(new Offer(), HttpStatus.BAD_REQUEST);
        }

    }
}
