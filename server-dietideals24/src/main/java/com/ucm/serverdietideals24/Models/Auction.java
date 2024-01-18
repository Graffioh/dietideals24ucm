package com.ucm.serverdietideals24.Models;

import java.util.ArrayList;
import java.util.Date;
import java.sql.Time;
import java.sql.Timestamp;

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

    private ArrayList<Offer> offers;

    // English auction
    private Float baseStartAuction, raiseThreshold;

    private Time offerTimer;

    // Fixed time auction
    private Date expireDate;

    // Descending auction
    private Float startPrice, decrementAmount;

    private Timestamp timer;

    // Descendind and Fixed time auction
    private Float minimumPrice;

    private Time expireTime;

}