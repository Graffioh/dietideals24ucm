package com.ucm.serverdietideals24.Models;

import java.util.Date;
import java.sql.Time;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import com.ucm.serverdietideals24.Models.Enums.AuctionType;
import com.ucm.serverdietideals24.Models.Enums.AuctionCategory;

@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class Auction {

    @NonNull
    private Long id;

    @NonNull
    private String auctionDescription;

    @NonNull
    private String auctionName;

    @NonNull
    private String auctionQuality;

    @NonNull
    private Float currentOffer;

    private AuctionType auctionType;
    private AuctionCategory auctionCategory;

    @NonNull
    private Long idUserAccount;

    private String auctionImages;

    private Boolean isOver;

    // Fixed time
    private Date expireDate;
    private Time expireTime;
    private Float minimumAcceptablePrice;

    // English
    private Float riseThreshold;

    // Descending
    private Float decrementAmount;
    private Float endPrice;

    // Descending and English
    private Float startPrice;
    private Time baseTimer;
    private Time currentTimer;

    // Custom constructors
    // Fixed time
    public Auction(@NonNull Long id, @NonNull String auctionDescription, @NonNull String auctionName,
            String auctionQuality, @NonNull Float currentOffer, AuctionType auctionType,
            AuctionCategory auctionCategory, @NonNull Long idUserAccount, String auctionImages,
            Date expireDate, Time expireTime, Float minimumAcceptablePrice) {
        this.id = id;
        this.auctionDescription = auctionDescription;
        this.auctionName = auctionName;
        this.auctionQuality = auctionQuality;
        this.currentOffer = currentOffer;
        this.auctionType = auctionType;
        this.auctionCategory = auctionCategory;
        this.idUserAccount = idUserAccount;
        this.auctionImages = auctionImages;
        this.expireDate = expireDate;
        this.expireTime = expireTime;
        this.minimumAcceptablePrice = minimumAcceptablePrice;
    }

    // English
    public Auction(@NonNull Long id, @NonNull String auctionDescription, @NonNull String auctionName,
            String auctionQuality, @NonNull Float currentOffer, AuctionType auctionType,
            AuctionCategory auctionCategory, @NonNull Long idUserAccount, String auctionImages,
            Float riseThreshold, Float startPrice, Time baseTimer, Time currentTimer) {
        this.id = id;
        this.auctionDescription = auctionDescription;
        this.auctionName = auctionName;
        this.auctionQuality = auctionQuality;
        this.currentOffer = currentOffer;
        this.auctionType = auctionType;
        this.auctionCategory = auctionCategory;
        this.idUserAccount = idUserAccount;
        this.auctionImages = auctionImages;
        this.riseThreshold = riseThreshold;
        this.startPrice = startPrice;
        this.baseTimer = baseTimer;
        this.currentTimer = currentTimer;
    }

    // Descending
    public Auction(@NonNull Long id, @NonNull String auctionDescription, @NonNull String auctionName,
            String auctionQuality, @NonNull Float currentOffer, AuctionType auctionType,
            AuctionCategory auctionCategory, @NonNull Long idUserAccount, String auctionImages,
            Float decrementAmount, Float endPrice, Float startPrice, Time baseTimer, Time currentTimer) {
        this.id = id;
        this.auctionDescription = auctionDescription;
        this.auctionName = auctionName;
        this.auctionQuality = auctionQuality;
        this.currentOffer = currentOffer;
        this.auctionType = auctionType;
        this.auctionCategory = auctionCategory;
        this.idUserAccount = idUserAccount;
        this.auctionImages = auctionImages;
        this.decrementAmount = decrementAmount;
        this.endPrice = endPrice;
        this.startPrice = startPrice;
        this.baseTimer = baseTimer;
        this.currentTimer = currentTimer;
    }

}