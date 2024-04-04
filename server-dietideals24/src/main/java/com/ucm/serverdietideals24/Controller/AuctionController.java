package com.ucm.serverdietideals24.Controller;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidParameterException;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.ucm.serverdietideals24.Models.Auction;
import com.ucm.serverdietideals24.Util.AuctionValidatorUtil;
import com.ucm.serverdietideals24.DAO.AuctionDAO;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://dietideals24.vercel.app", "https://dietideals24-git-deploy-render-vercel-graffioh.vercel.app"}, allowCredentials = "true")
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

    @PostMapping("/category")
    public ResponseEntity<List<Auction>> fetchAuctionBasedOnCategory(@RequestBody String category) {
        try {
            List<Auction> auctions = auctionDAO.getViaCategory(category);

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
        AuctionValidatorUtil auctionValidator = new AuctionValidatorUtil();

        try {
            if(auctionValidator.isAuctionValid(entity)) {
                auctionDAO.create(entity);
                return ResponseEntity.status(HttpStatus.CREATED).body(entity);
            } else {
                throw new InvalidParameterException();
            }
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
            if (auction.getCurrentTimer().equals(Time.valueOf("00:00:00"))) {
                decreasePrice(auction);
                setCurrentDecrementTimer(auction.getId(), auction.getBaseTimer());
            } else {
                setCurrentDecrementTimer(auction.getId(), decrementTimerBy1Second(auction));
            }
        }
    }

    @Scheduled(fixedRate = 1000)
    public void englishAuctionTimerReduction() {
        List<Auction> auctions = auctionDAO.getAllEnglishAuctions();

        for (Auction auction : auctions) {
            if(!auction.getIsOver()) {
                if (auction.getCurrentTimer().equals(Time.valueOf("00:00:00"))) {
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
        LocalTime cdtLocalTime = auction.getCurrentTimer().toLocalTime();
        LocalTime cdtDecrementedLocalTime = cdtLocalTime.minusSeconds(1);
        Time newDecrementTimerValue = Time.valueOf(cdtDecrementedLocalTime);

        return newDecrementTimerValue;
    }

    private void decreasePrice(Auction auction) {
        if (!auction.getIsOver()) {
            if (auction.getCurrentOffer() > auction.getEndPrice()) {
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
    
    @GetMapping("/count")
    public ResponseEntity<Integer> countAllAuctions() {
        try {
            Integer auctionsCount = auctionDAO.countAll();

            return ResponseEntity.ok(auctionsCount);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(-1);
        }
    }

    @GetMapping("/count/user/{userId}")
    public ResponseEntity<Integer> countUsersAuctions(@PathVariable Long userId) {
        try {
            Integer auctionsCount = auctionDAO.countAllViaUserId(userId);
            
            return ResponseEntity.ok(auctionsCount);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(-1);
        }
    }

    @GetMapping("/count/from-offers/user/{userId}")
    public ResponseEntity<Integer> countUsersAuctionsFromOffers(@PathVariable Long userId) {
        try {
            Integer auctionsCount = auctionDAO.countAllViaOffersAndUserId(userId);

            return ResponseEntity.ok(auctionsCount);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(-1);
        }
    }
    
    // AWS S3 for images
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucketName}")
    private String S3bucketName;

    @PostMapping("/upload-img")
    public ResponseEntity<String> uploadImage(@RequestPart("file") MultipartFile file, @RequestParam String auctionId) throws IOException {
        try {
            String key = "auctions/" + auctionId + "/" + file.getOriginalFilename();
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());
            amazonS3.putObject(S3bucketName, key, file.getInputStream(), metadata);
            String imageUrlKey = key;

            return ResponseEntity.ok(imageUrlKey);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("null");
        }
    }
    
    @GetMapping("/image")
    public ResponseEntity<byte[]> getImage(@RequestParam String key) throws IOException {
        try {
            S3Object s3Object = amazonS3.getObject(S3bucketName, key);
            InputStream inputStream = s3Object.getObjectContent();
            byte[] bytes = IOUtils.toByteArray(inputStream);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.parseMediaType(s3Object.getObjectMetadata().getContentType()));
            httpHeaders.setContentLength(s3Object.getObjectMetadata().getContentLength());
            return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.BAD_REQUEST);
        }
    }
}
