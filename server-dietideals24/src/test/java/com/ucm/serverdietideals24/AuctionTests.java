package com.ucm.serverdietideals24;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ucm.serverdietideals24.Models.Auction;
import com.ucm.serverdietideals24.Models.Enums.AuctionCategory;
import com.ucm.serverdietideals24.Models.Enums.AuctionType;
import com.ucm.serverdietideals24.Util.AuctionValidatorUtil;

public class AuctionTests {
    private AuctionValidatorUtil auctionValidator;

    @BeforeEach
    private void setUp() {
        this.auctionValidator = new AuctionValidatorUtil();
    }

    private static Date parseDate(String dateStr) throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
    }

    @Test
    public void testIsAuctionValidForInsertion() throws Exception {
        
        // Arrange
        // ************************************************
        Auction validAuction1 = new Auction(
                1L,
                "Nice cars from cars, really good shape, i'm good",
                "Cars from Cars",
                "Bad",
                0.0f,
                AuctionType.fixedtime,
                AuctionCategory.Toys,
                1L,
                "carsfromcars.jpeg",
                parseDate("2024-10-10"),
                new Time(33200000),
                23.0f); // reserve price

        Auction validAuction2 = new Auction(
                2L,
                "Black flowers, good for a happy garden, really reccomended, please buy this flowers.",
                "Black flowers",
                "Good",
                0.0f,
                AuctionType.english,
                AuctionCategory.Gardening,
                2L,
                "blckflowrs.jpg",
                10.0f,
                1000.0f,
                new Time(43200000),
                new Time(0));

        Auction invalidAuction1 = new Auction(
                3L,
                "Table tennis table for sell, used by the best tennis table player in the world and rank 94 on leetcode, Ma Lin",
                "Table tennis table",
                "Good",
                0.0f,
                AuctionType.fixedtime,
                AuctionCategory.Sport,
                3L,
                "tabletennis123.jpg",
                parseDate("2010-10-10"), // expireDate (not valid)
                new Time(13200000),
                80.0f);

        Auction invalidAuction2 = new Auction(
                4L,
                "Selling this newborn dog named @ruta, it's really cute and affordable",
                "A dog named @ruta",
                "Good",
                0.0f,
                AuctionType.descending,
                AuctionCategory.Collectibles,
                4L,
                "imageDogCute.jpg",
                5.0f,
                -100.0f, // end price (not valid because negative)
                4200.0f,
                new Time(25200000),
                new Time(0));

        Auction invalidAuction3 = new Auction(
                4L,
                "selling this really new iPhone, the best in the current market, if you think it's old, then you are old",
                "iPhone 3G",
                "Good",
                0.0f,
                AuctionType.english,
                AuctionCategory.Collectibles,
                4L,
                "phone3G.txt",
                -5.0f, // rise threshold (not valid because negative)
                120000.0f, // start price (not valid because > 9999)
                new Time(43200000),
                new Time(0));
        // ************************************************

        // Act
        // ************************************************
        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
        boolean isAuctionValid2 =
        auctionValidator.isAuctionValid(validAuction2);
        boolean isAuctionValid3 =
        auctionValidator.isAuctionValid(invalidAuction1);
        boolean isAuctionValid4 =
        auctionValidator.isAuctionValid(invalidAuction2);
        boolean isAuctionValid5 =
        auctionValidator.isAuctionValid(invalidAuction3);
        // ************************************************

        // Assert
        // ************************************************
        assertEquals(true, isAuctionValid1);
        assertEquals(true, isAuctionValid2);
        assertEquals(false, isAuctionValid3);
        assertEquals(false, isAuctionValid4);
        assertEquals(false, isAuctionValid5);
        // ************************************************
    }
}
