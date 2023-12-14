package com.ucm.serverdietideals24.Models;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;

enum AuctionType {
    English, FixedTime, Descending
}

enum AuctionCategory {
    Appliances, BeautyAndHealth, BooksAndMagazines, BoatingAndBoats,
    CarsMotorcyclesAndOtherVehicles, ClothingAndAccessories, Collectibles, CoinsAndBanknotes, Comics, Computers,
    Electronics, Gardening, HomeFurnitureAndDIY, Infancy, Lighting, MoviesAndDVDs, MusicCDsAndVinyl, PhotographyAndVideo,
    SportsAndLeisure, Stamps, TicketsAndEvents, Toys, TravelAccessories, VideoGamesAndConsoles, WatchesAndJewelry
}

@NoArgsConstructor
@AllArgsConstructor
public class Auction {
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String auctionDescription, auctionName, auctionQuality, auctionImages;

    @Getter @Setter
    private float currentOffer;

    @Getter @Setter
    private AuctionType auctionType;

    @Getter @Setter
    private AuctionCategory auctionCategory;

    @Getter @Setter
    private ArrayList<Offer> offers;

    // English auction
    @Getter @Setter
    private float baseStartAuction, raiseThreshold;

    @Getter @Setter
    private Timestamp offerTimer;
    
    // Fixed time auction
    @Getter @Setter
    private Date expireDate;

    // Descending auction
    @Getter @Setter
    private float startPrice, decrementAmount, minimumPrice;

    @Getter @Setter
    private Timestamp fixedTime, timer;
}
