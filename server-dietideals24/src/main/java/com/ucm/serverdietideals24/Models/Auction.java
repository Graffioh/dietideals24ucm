package com.ucm.serverdietideals24.Models;

import java.util.ArrayList;
import java.util.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.NonNull;

enum AuctionType {
    English, FixedTime, Descending
}

enum AuctionCategory {
    Appliances, BeautyAndHealth, BooksAndMagazines, BoatingAndBoats,
    CarsMotorcyclesAndOtherVehicles, ClothingAndAccessories, Collectibles, CoinsAndBanknotes, Comics, Computers,
    Electronics, Gardening, HomeFurnitureAndDIY, Infancy, Lighting, MoviesAndDVDs, MusicCDsAndVinyl,
    PhotographyAndVideo,
    SportsAndLeisure, Stamps, TicketsAndEvents, Toys, TravelAccessories, VideoGamesAndConsoles, WatchesAndJewelry
}

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Auction {
    @NonNull
    private Integer id;

    @NonNull
    private String auctionDescription, auctionName, auctionQuality;
    private String auctionImages;

    @NonNull
    private Float currentOffer;

    @NonNull
    private String auctionType;

    @NonNull
    private AuctionCategory auctionCategory;

    private ArrayList<Offer> offers;

    // English auction
    private Float baseStartAuction, raiseThreshold;

    private Timestamp offerTimer;

    // Fixed time auction
    private Date expireDate;

    // Descending auction
    private Float startPrice, decrementAmount, minimumPrice;

    private Timestamp fixedTime, timer;
}