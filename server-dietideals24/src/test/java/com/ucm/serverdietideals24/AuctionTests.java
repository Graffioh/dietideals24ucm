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
        public void testIsFixedTimeAuctionValidForInsertion() throws Exception {
                // Arrange
                // ************************************************
                Auction validAuction1 = new Auction(
                                1L,
                                "Nice cars from cars, really good shape",
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

                Auction validAuction2 = new Auction(2L, "Brand new bike, never used", "Bike", "Good", 0.0f,
                                AuctionType.fixedtime, AuctionCategory.Toys, 2L, "bike.jpg", parseDate("2025-01-01"),
                                new Time(34200000), 50.0f);

                Auction validAuction3 = new Auction(4L, "Old book, great condition", "Book", "Fair", 0.0f,
                                AuctionType.fixedtime, AuctionCategory.Books, 4L, "book.png", parseDate("2026-06-01"),
                                new Time(34200000), 10.0f);

                // expireDate (not valid)
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

                // No auction name
                Auction invalidAuction2 = new Auction(5L, "Description but no name", "", "Good", 0.0f,
                                AuctionType.fixedtime,
                                AuctionCategory.Collectibles, 5L, "table.jpg", parseDate("2024-10-10"),
                                new Time(16200000),
                                20.0f);

                // Wrong image extension
                Auction invalidAuction3 = new Auction(6L, "Old chair, great condition", "Chair", "Good", 0.0f,
                                AuctionType.fixedtime, AuctionCategory.Clothing, 6L, "chair.doc",
                                parseDate("2025-01-01"), new Time(17200000), 30.0f);

                // Negative minimumAcceptablePrice
                Auction invalidAuction4 = new Auction(7L, "New phone, unlocked", "Phone", "Good", 0.0f,
                                AuctionType.fixedtime, AuctionCategory.Electronics, 7L, "phone.jpg",
                                parseDate("2015-01-01"), new Time(18200000), -10.0f);

                // minimumAcceptablePrice too big
                Auction invalidAuction5 = new Auction(8L, "Old laptop, great condition", "Laptop", "Good", 0.0f,
                                AuctionType.fixedtime, AuctionCategory.Electronics, 8L, "laptop.jpg",
                                parseDate("2026-01-01"), new Time(19200000), 10000.1f);

                // ************************************************

                // Act
                // ************************************************
                boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                boolean isAuctionValid2 = auctionValidator.isAuctionValid(validAuction2);
                boolean isAuctionValid3 = auctionValidator.isAuctionValid(validAuction3);
                boolean isAuctionValid4 = auctionValidator.isAuctionValid(invalidAuction1);
                boolean isAuctionValid5 = auctionValidator.isAuctionValid(invalidAuction2);
                boolean isAuctionValid6 = auctionValidator.isAuctionValid(invalidAuction3);
                boolean isAuctionValid7 = auctionValidator.isAuctionValid(invalidAuction4);
                boolean isAuctionValid8 = auctionValidator.isAuctionValid(invalidAuction5);
                // ************************************************

                // Assert
                // ************************************************
                assertEquals(true, isAuctionValid1);
                assertEquals(true, isAuctionValid2);
                assertEquals(true, isAuctionValid3);
                assertEquals(false, isAuctionValid4);
                assertEquals(false, isAuctionValid5);
                assertEquals(false, isAuctionValid6);
                assertEquals(false, isAuctionValid7);
                assertEquals(false, isAuctionValid8);
        }

        @Test
        public void testIsEnglishAuctionValidForInsertion() throws Exception {
                // Arrange
                // ************************************************
                Auction validAuction1 = new Auction(
                                1L,
                                "Brand new bike, never used",
                                "Bike",
                                "Good",
                                0.0f,
                                AuctionType.english,
                                AuctionCategory.Toys,
                                1L,
                                "bike.jpg",
                                10.0f,
                                100.0f,
                                new Time(34200000),
                                new Time(0));

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

                Auction validAuction3 = new Auction(
                                3L,
                                "Old book, great condition",
                                "Book",
                                "Fair",
                                0.0f,
                                AuctionType.english,
                                AuctionCategory.Books,
                                3L,
                                "book.png",
                                5.0f,
                                50.0f,
                                new Time(34200000),
                                new Time(0));

                // rise threshold (not valid because negative)
                // start price (not valid because > 9999)
                Auction invalidAuction1 = new Auction(
                                4L,
                                "selling this really new iPhone, the best in the current market, if you think it's old, then you are old",
                                "iPhone 3G",
                                "Good",
                                0.0f,
                                AuctionType.english,
                                AuctionCategory.Collectibles,
                                4L,
                                "phone3G.txt",
                                -5.0f,
                                120000.0f,
                                new Time(43200000),
                                new Time(0));

                Auction invalidAuction2 = new Auction(
                                5L,
                                "Table tennis table for sell, used by the best tennis table player in the world and rank 94 on leetcode, Ma Lin",
                                "",
                                "Good",
                                0.0f,
                                AuctionType.english,
                                AuctionCategory.Sport,
                                5L,
                                "tabletennis123.jpg",
                                10.0f,
                                100.0f,
                                new Time(13200000),
                                new Time(0));

                Auction invalidAuction3 = new Auction(
                                6L,
                                "Old chair, great condition",
                                "Chair",
                                "Good",
                                0.0f,
                                AuctionType.english,
                                AuctionCategory.Clothing,
                                6L,
                                "chair.doc",
                                5.0f,
                                50.0f,
                                new Time(17200000),
                                new Time(0));

                // rise threshold (not valid because 0)
                Auction invalidAuction4 = new Auction(
                                7L,
                                "New phone, unlocked",
                                "Phone",
                                "Good",
                                0.0f,
                                AuctionType.english,
                                AuctionCategory.Electronics,
                                7L,
                                "phone.jpg",
                                0.0f,
                                100.0f,
                                new Time(18200000),
                                new Time(0));

                // start price (not valid because > 9999)
                Auction invalidAuction5 = new Auction(
                                8L,
                                "Old laptop, great condition",
                                "Laptop",
                                "Good",
                                0.0f,
                                AuctionType.english,
                                AuctionCategory.Electronics,
                                8L,
                                "laptop.jpg",
                                10000.1f,
                                100.0f,
                                new Time(19200000),
                                new Time(0));
                // ************************************************

                // Act
                // ************************************************
                boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                boolean isAuctionValid2 = auctionValidator.isAuctionValid(validAuction2);
                boolean isAuctionValid3 = auctionValidator.isAuctionValid(validAuction3);
                boolean isAuctionValid4 = auctionValidator.isAuctionValid(invalidAuction1);
                boolean isAuctionValid5 = auctionValidator.isAuctionValid(invalidAuction2);
                boolean isAuctionValid6 = auctionValidator.isAuctionValid(invalidAuction3);
                boolean isAuctionValid7 = auctionValidator.isAuctionValid(invalidAuction4);
                boolean isAuctionValid8 = auctionValidator.isAuctionValid(invalidAuction5);
                // ************************************************

                // Assert
                // ************************************************
                assertEquals(true, isAuctionValid1);
                assertEquals(true, isAuctionValid2);
                assertEquals(true, isAuctionValid3);
                assertEquals(false, isAuctionValid4);
                assertEquals(false, isAuctionValid5);
                assertEquals(false, isAuctionValid6);
                assertEquals(false, isAuctionValid7);
                assertEquals(false, isAuctionValid8);
        }

        @Test
        public void testIsDescendingAuctionValidForInsertion() throws Exception {
                // Arrange
                // ************************************************
                Auction validAuction1 = new Auction(
                                1L,
                                "Brand new mountain bike, never used",
                                "Mountain Bike",
                                "Good",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Toys,
                                1L,
                                "mountainbike.jpg",
                                100.0f,
                                50.0f,
                                1000.0f,
                                new Time(34200000),
                                new Time(0));

                Auction validAuction2 = new Auction(
                                2L,
                                "Beautiful orchids, great for a happy home, really reccomended, please buy this orchids.",
                                "Orchids",
                                "Good",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Gardening,
                                2L,
                                "orchids.jpg",
                                23.0f,
                                2.0f,
                                50.0f,
                                new Time(43200000),
                                new Time(0));

                Auction validAuction3 = new Auction(
                                3L,
                                "Old but rare book, great condition",
                                "Rare Book",
                                "Fair",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Books,
                                3L,
                                "rarebook.png",
                                5.0f,
                                20.0f,
                                7899.0f,
                                new Time(34200000),
                                new Time(0));

                // end price (not valid because negative)
                Auction invalidAuction1 = new Auction(
                                4L,
                                "Selling this newborn puppy named Max, it's really cute and affordable",
                                "Puppy Max",
                                "Good",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Collectibles,
                                4L,
                                "puppyMax.jpg",
                                5.0f,
                                -100.0f,
                                4200.0f,
                                new Time(25200000),
                                new Time(0));

                // No auction name and invalid decrementAmount relative to startPrice
                Auction invalidAuction2 = new Auction(
                                5L,
                                "Table tennis table for sell, used by the best tennis table player in the world and rank 94 on leetcode, Ma Lin",
                                "",
                                "Good",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Sport,
                                5L,
                                "tabletennis123.jpg",
                                100.0f,
                                50.0f,
                                10.0f,
                                new Time(13200000),
                                new Time(0));

                // Wrong image extension
                Auction invalidAuction3 = new Auction(
                                6L,
                                "Old but comfortable sofa, great condition",
                                "Sofa",
                                "Good",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Clothing,
                                6L,
                                "sofa.doc",
                                50.0f,
                                20.0f,
                                5.0f,
                                new Time(17200000),
                                new Time(0));

                // decrement amount (not valid because 0)
                Auction invalidAuction4 = new Auction(
                                7L,
                                "New smartphone, unlocked",
                                "Smartphone",
                                "Good",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Electronics,
                                7L,
                                "smartphone.jpg",
                                0.0f,
                                50.0f,
                                0.0f,
                                new Time(18200000),
                                new Time(0));

                // start price (not valid because > 9999) and wrong decrementAmount
                Auction invalidAuction5 = new Auction(
                                8L,
                                "Old but powerful laptop, great condition",
                                "Laptop",
                                "Good",
                                0.0f,
                                AuctionType.descending,
                                AuctionCategory.Electronics,
                                8L,
                                "laptop.jpg",
                                10000.1f,
                                5000.0f,
                                100.0f,
                                new Time(19200000),
                                new Time(0));
                // ************************************************

                // Act
                // ************************************************
                boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                boolean isAuctionValid2 = auctionValidator.isAuctionValid(validAuction2);
                boolean isAuctionValid3 = auctionValidator.isAuctionValid(validAuction3);
                boolean isAuctionValid4 = auctionValidator.isAuctionValid(invalidAuction1);
                boolean isAuctionValid5 = auctionValidator.isAuctionValid(invalidAuction2);
                boolean isAuctionValid6 = auctionValidator.isAuctionValid(invalidAuction3);
                boolean isAuctionValid7 = auctionValidator.isAuctionValid(invalidAuction4);
                boolean isAuctionValid8 = auctionValidator.isAuctionValid(invalidAuction5);
                // ************************************************

                // Assert
                // ************************************************
                assertEquals(true, isAuctionValid1);
                assertEquals(true, isAuctionValid2);
                assertEquals(true, isAuctionValid3);
                assertEquals(false, isAuctionValid4);
                assertEquals(false, isAuctionValid5);
                assertEquals(false, isAuctionValid6);
                assertEquals(false, isAuctionValid7);
                assertEquals(false, isAuctionValid8);
        }
}
