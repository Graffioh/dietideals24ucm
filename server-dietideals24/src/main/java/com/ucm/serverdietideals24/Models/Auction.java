package com.ucm.serverdietideals24.Models;

import java.util.ArrayList;
import java.util.Date;
import java.sql.Time;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.NonNull;

import com.ucm.serverdietideals24.Models.Enums.AuctionType;
import com.ucm.serverdietideals24.Models.Enums.AuctionCategory;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Auction {
    @NonNull
    private Long id;

    @NonNull
    private String auctionDescription, auctionName, auctionQuality;

    @NonNull
    private Float currentOffer;

    @NonNull
    private AuctionType auctionType;

    @NonNull
    private AuctionCategory auctionCategory;

    @NonNull
    private Long idUserAccount;

    @NonNull
    private String auctionImages;

    private Boolean isOver;

    private ArrayList<Offer> offers;

    // Fixed time
    private Date expireDate;
    private Time expireTime;
    private Float minimumAcceptablePrice;

    // English
    private Float raiseThreshold;

    // Descending
    private Float decrementAmount;
    private Float endPrice;

    // Descending and English
    private Float startPrice;
    private Time baseTimer, currentTimer;
}