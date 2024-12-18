package com.ucm.serverdietideals24;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Nested;

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

        private static Date parseDate(String dateStr) {
                try {
                        return new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
                } catch (ParseException e) {
                        System.err.println("Error parsing date: " + dateStr);
                        return null;
                }
        }

        // GENERALI
        // ------------------------------------------
        @Nested
        class InsertBaseAttributesAuctionValidation {
                // Test AuctionType
                @Test
                public void testAuctionTypeNull() {
                        // Arrange
                        Auction validAuction = new Auction(
                                        1L,
                                        "Valid auction description",
                                        "Valid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        Auction invalidAuction = new Auction(
                                        1L,
                                        "Invalid auction description",
                                        "Invalid auction name",
                                        "Good",
                                        0.0f,
                                        null, // AuctionType null
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        // Act
                        boolean isValidAuction = auctionValidator.isAuctionValid(validAuction);
                        boolean isInvalidAuction = auctionValidator.isAuctionValid(invalidAuction);

                        // Assert
                        assertTrue(isValidAuction);
                        assertFalse(isInvalidAuction);
                }

                // Test AuctionCategory
                @Test
                public void testAuctionCategoryNull() {
                        // Arrange
                        Auction validAuction = new Auction(
                                        1L,
                                        "Valid auction description",
                                        "Valid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        Auction invalidAuction = new Auction(
                                        1L,
                                        "Invalid auction description",
                                        "Invalid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        null, // AuctionCategory null
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        // Act
                        boolean isValidAuction = auctionValidator.isAuctionValid(validAuction);
                        boolean isInvalidAuction = auctionValidator.isAuctionValid(invalidAuction);

                        // Assert
                        assertTrue(isValidAuction);
                        assertFalse(isInvalidAuction);
                }

                // Test AuctionQuality
                @Test
                public void testAuctionQualityNull() {
                        // Arrange
                        Auction validAuction = new Auction(
                                        1L,
                                        "Valid auction description",
                                        "Valid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        Auction invalidAuction = new Auction(
                                        1L,
                                        "Invalid auction description",
                                        "Invalid auction name",
                                        null, // AuctionQuality null
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        // Act
                        boolean isValidAuction = auctionValidator.isAuctionValid(validAuction);
                        boolean isInvalidAuction = auctionValidator.isAuctionValid(invalidAuction);

                        // Assert
                        assertTrue(isValidAuction);
                        assertFalse(isInvalidAuction);
                }

                // Test auctionImages null or empty
                @Test
                public void testAuctionImagesNullOrEmpty() {
                        // Arrange
                        Auction validAuction = new Auction(
                                        1L,
                                        "Valid auction description",
                                        "Valid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        Auction invalidAuctionNullImage = new Auction(
                                        1L,
                                        "Invalid auction description",
                                        "Invalid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        null, // auctionImages null
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        Auction invalidAuctionEmptyImage = new Auction(
                                        1L,
                                        "Invalid auction description",
                                        "Invalid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "", // auctionImages empty
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        // Act
                        boolean isValidAuction = auctionValidator.isAuctionValid(validAuction);
                        boolean isInvalidAuctionNullImage = auctionValidator.isAuctionValid(invalidAuctionNullImage);
                        boolean isInvalidAuctionEmptyImage = auctionValidator.isAuctionValid(invalidAuctionEmptyImage);

                        // Assert
                        assertTrue(isValidAuction);
                        assertFalse(isInvalidAuctionNullImage);
                        assertFalse(isInvalidAuctionEmptyImage);
                }

                // Test auctionImages wrong extension
                @Test
                public void testAuctionImagesWrongExtension() {
                        // Arrange
                        Auction validAuction = new Auction(
                                        1L,
                                        "Valid auction description",
                                        "Valid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        Auction invalidAuctionWrongExtension = new Auction(
                                        1L,
                                        "Invalid auction description",
                                        "Invalid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.doc", // wrong extension
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        // Act
                        boolean isValidAuction = auctionValidator.isAuctionValid(validAuction);
                        boolean isInvalidAuctionWrongExtension = auctionValidator
                                        .isAuctionValid(invalidAuctionWrongExtension);

                        // Assert
                        assertTrue(isValidAuction);
                        assertFalse(isInvalidAuctionWrongExtension);
                }

                // Test auctionName empty
                @Test
                public void testAuctionNameEmpty() {
                        // Arrange
                        Auction validAuction = new Auction(
                                        1L,
                                        "Valid auction description",
                                        "Valid auction name",
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        Auction invalidAuctionEmptyName = new Auction(
                                        1L,
                                        "Invalid auction description",
                                        "", // auctionName empty
                                        "Good",
                                        0.0f,
                                        AuctionType.english,
                                        AuctionCategory.Toys,
                                        1L,
                                        "image.jpg",
                                        10.0f,
                                        100.0f,
                                        new Time(34200000),
                                        new Time(0));

                        // Act
                        boolean isValidAuction = auctionValidator.isAuctionValid(validAuction);
                        boolean isInvalidAuctionEmptyName = auctionValidator.isAuctionValid(invalidAuctionEmptyName);

                        // Assert
                        assertTrue(isValidAuction);
                        assertFalse(isInvalidAuctionEmptyName);
                }
        }
        // ------------------------------------------

        // Fixed time
        // ------------------------------------------
        @Nested
        class InsertFixedTimeAuctionValidation {
                @Test
                void testFixedTimeAuctionExpireDate() {
                        // Arrange
                        // **********************************************
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
                                        parseDate("2025-10-10"),
                                        new Time(33200000),
                                        23.0f);

                        Auction validAuction2 = new Auction(
                                        2L,
                                        "Brand new bike, never used",
                                        "Bike",
                                        "Good",
                                        0.0f,
                                        AuctionType.fixedtime,
                                        AuctionCategory.Toys,
                                        2L,
                                        "bike.jpg",
                                        parseDate("2025-01-01"),
                                        new Time(34200000),
                                        50.0f);

                        // expireDate not valid
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
                                        parseDate("2010-10-10"),
                                        new Time(13200000),
                                        80.0f);

                        // expireDate null
                        Auction invalidAuction2 = new Auction(
                                        3L,
                                        "Table tennis table for sell, used by the best tennis table player in the world and rank 94 on leetcode, Ma Lin",
                                        "Table tennis table",
                                        "Good",
                                        0.0f,
                                        AuctionType.fixedtime,
                                        AuctionCategory.Sport,
                                        3L,
                                        "tabletennis123.jpg",
                                        null,
                                        new Time(13200000),
                                        80.0f);
                        // **********************************************

                        // Act
                        // **********************************************
                        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                        boolean isAuctionValid2 = auctionValidator.isAuctionValid(validAuction2);
                        boolean isAuctionValid3 = auctionValidator.isAuctionValid(invalidAuction1);
                        boolean isAuctionValid4 = auctionValidator.isAuctionValid(invalidAuction2);
                        // **********************************************

                        // Assert
                        // **********************************************
                        assertEquals(true, isAuctionValid1);
                        assertEquals(true, isAuctionValid2);
                        assertEquals(false, isAuctionValid3);
                        assertEquals(false, isAuctionValid4);
                        // **********************************************
                }

                @Test
                void testFixedTimeAuctionMinimumAcceptable() {
                        // Arrange
                        // **********************************************
                        Auction validAuction1 = new Auction(
                                        4L,
                                        "Old book, great condition",
                                        "Book",
                                        "Fair",
                                        0.0f,
                                        AuctionType.fixedtime, AuctionCategory.Books,
                                        4L,
                                        "book.png",
                                        parseDate("2026-06-01"),
                                        new Time(34200000),
                                        10.0f);

                        // minimumAcceptablePrice negative
                        Auction invalidAuction1 = new Auction(
                                        7L,
                                        "New phone, unlocked",
                                        "Phone",
                                        "Good",
                                        0.0f,
                                        AuctionType.fixedtime, AuctionCategory.Electronics,
                                        7L,
                                        "phone.jpg",
                                        parseDate("2015-01-01"),
                                        new Time(18200000),
                                        -10.0f);

                        // minimumAcceptablePrice too big
                        Auction invalidAuction2 = new Auction(
                                        8L,
                                        "Old laptop, great condition",
                                        "Laptop",
                                        "Good",
                                        0.0f,
                                        AuctionType.fixedtime, AuctionCategory.Electronics,
                                        8L,
                                        "laptop.jpg",
                                        parseDate("2026-01-01"),
                                        new Time(19200000),
                                        10000.1f);

                        // minimumAcceptablePrice null
                        Auction invalidAuction3 = new Auction(
                                        8L,
                                        "Old laptop, great condition",
                                        "Laptop",
                                        "Good",
                                        0.0f,
                                        AuctionType.fixedtime, AuctionCategory.Electronics,
                                        8L,
                                        "laptop.jpg",
                                        parseDate("2026-01-01"),
                                        new Time(19200000),
                                        null);
                        // **********************************************

                        // Act
                        // **********************************************
                        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                        boolean isAuctionValid2 = auctionValidator.isAuctionValid(invalidAuction1);
                        boolean isAuctionValid3 = auctionValidator.isAuctionValid(invalidAuction2);
                        boolean isAuctionValid4 = auctionValidator.isAuctionValid(invalidAuction3);
                        // **********************************************

                        // Assert
                        // **********************************************
                        assertEquals(true, isAuctionValid1);
                        assertEquals(false, isAuctionValid2);
                        assertEquals(false, isAuctionValid3);
                        assertEquals(false, isAuctionValid4);
                        // **********************************************
                }
        }
        // ------------------------------------------

        // English
        // ------------------------------------------
        @Nested
        class InsertEnglishAuctionValidation {
                @Test
                void testEnglishAuctionStartPrice() {
                        // Arrange
                        // **********************************************
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

                        // startPrice too big
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
                                        5.0f,
                                        120000.0f,
                                        new Time(43200000),
                                        new Time(0));

                        // startPrice null
                        Auction invalidAuction2 = new Auction(
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
                                        null,
                                        new Time(19200000),
                                        new Time(0));
                        // **********************************************

                        // Act
                        // **********************************************
                        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                        boolean isAuctionValid2 = auctionValidator.isAuctionValid(invalidAuction1);
                        boolean isAuctionValid3 = auctionValidator.isAuctionValid(invalidAuction2);
                        // **********************************************

                        // Assert
                        // **********************************************
                        assertEquals(true, isAuctionValid1);
                        assertEquals(false, isAuctionValid2);
                        assertEquals(false, isAuctionValid3);
                        // **********************************************
                }

                @Test
                void testEnglishAuctionRiseThresholdPrice() {
                        // Arrange
                        // **********************************************
                        Auction validAuction1 = new Auction(
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

                        // riseThreshold is 0
                        Auction invalidAuction1 = new Auction(
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

                        // riseThreshold negative
                        Auction invalidAuction2 = new Auction(
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
                                        12.0f,
                                        new Time(43200000),
                                        new Time(0));

                        // riseThreshold null
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
                                        null,
                                        12.0f,
                                        new Time(43200000),
                                        new Time(0));
                        // **********************************************

                        // Act
                        // **********************************************
                        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                        boolean isAuctionValid2 = auctionValidator.isAuctionValid(invalidAuction1);
                        boolean isAuctionValid3 = auctionValidator.isAuctionValid(invalidAuction2);
                        boolean isAuctionValid4 = auctionValidator.isAuctionValid(invalidAuction3);
                        // **********************************************

                        // Assert
                        // **********************************************
                        assertEquals(true, isAuctionValid1);
                        assertEquals(false, isAuctionValid2);
                        assertEquals(false, isAuctionValid3);
                        assertEquals(false, isAuctionValid4);
                        // **********************************************
                }
        }
        // ------------------------------------------

        // Descending
        // ------------------------------------------
        @Nested
        class InsertDescendingAuctionValidation {
                @Test
                void testDescendingAuctionStartPrice() {
                        // Arrange
                        // **********************************************
                        Auction validAuction1 = new Auction(
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

                        // startPrice too big
                        Auction invalidAuction1 = new Auction(
                                        8L,
                                        "Old but powerful laptop, great condition",
                                        "Laptop",
                                        "Good",
                                        0.0f,
                                        AuctionType.descending,
                                        AuctionCategory.Electronics,
                                        8L,
                                        "laptop.jpg",
                                        10.1f,
                                        5000.0f,
                                        10000.0f,
                                        new Time(19200000),
                                        new Time(0));

                        // startPrice null
                        Auction invalidAuction2 = new Auction(
                                        8L,
                                        "Old but powerful laptop, great condition",
                                        "Laptop",
                                        "Good",
                                        0.0f,
                                        AuctionType.descending,
                                        AuctionCategory.Electronics,
                                        8L,
                                        "laptop.jpg",
                                        10.1f,
                                        5000.0f,
                                        null,
                                        new Time(19200000),
                                        new Time(0));
                        // **********************************************

                        // Act
                        // **********************************************
                        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                        boolean isAuctionValid2 = auctionValidator.isAuctionValid(invalidAuction1);
                        boolean isAuctionValid3 = auctionValidator.isAuctionValid(invalidAuction2);
                        // **********************************************

                        // Assert
                        // **********************************************
                        assertEquals(true, isAuctionValid1);
                        assertEquals(false, isAuctionValid2);
                        assertEquals(false, isAuctionValid3);
                        // **********************************************
                }

                @Test
                void testDescendingAuctionDecrementAmount() {
                        // Arrange
                        // **********************************************
                        Auction validAuction1 = new Auction(
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

                        // decrementAmount is 0
                        Auction invalidAuction1 = new Auction(
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

                        // decrementAmount null
                        Auction invalidAuction2 = new Auction(
                                        7L,
                                        "New smartphone, unlocked",
                                        "Smartphone",
                                        "Good",
                                        0.0f,
                                        AuctionType.descending,
                                        AuctionCategory.Electronics,
                                        7L,
                                        "smartphone.jpg",
                                        null,
                                        50.0f,
                                        0.0f,
                                        new Time(18200000),
                                        new Time(0));
                        // **********************************************

                        // Act
                        // **********************************************
                        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                        boolean isAuctionValid2 = auctionValidator.isAuctionValid(invalidAuction1);
                        boolean isAuctionValid3 = auctionValidator.isAuctionValid(invalidAuction2);
                        // **********************************************

                        // Assert
                        // **********************************************
                        assertEquals(true, isAuctionValid1);
                        assertEquals(false, isAuctionValid2);
                        assertEquals(false, isAuctionValid3);
                        // **********************************************
                }

                @Test
                void testDescendingAuctionEndPrice() {
                        // Arrange
                        // **********************************************
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

                        // endPrice negative
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

                        // endPrice too big
                        Auction invalidAuction2 = new Auction(
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
                                        1000000.0f,
                                        4200.0f,
                                        new Time(25200000),
                                        new Time(0));

                        // endPrice null
                        Auction invalidAuction3 = new Auction(
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
                                        null,
                                        4200.0f,
                                        new Time(25200000),
                                        new Time(0));
                        // **********************************************

                        // Act
                        // **********************************************
                        boolean isAuctionValid1 = auctionValidator.isAuctionValid(validAuction1);
                        boolean isAuctionValid2 = auctionValidator.isAuctionValid(invalidAuction1);
                        boolean isAuctionValid3 = auctionValidator.isAuctionValid(invalidAuction2);
                        boolean isAuctionValid4 = auctionValidator.isAuctionValid(invalidAuction3);
                        // **********************************************

                        // Assert
                        // **********************************************
                        assertEquals(true, isAuctionValid1);
                        assertEquals(false, isAuctionValid2);
                        assertEquals(false, isAuctionValid3);
                        assertEquals(false, isAuctionValid4);
                        // **********************************************
                }

                @Test
                void testDescendingAuctionStartPriceEndPriceRelationship() {
                        float[] startPrices = { 2.0f, 1.0f, 99.9f, 100.0f };
                        float[] endPrices = { 1.0f, 100.0f, 101.0f, 50.0f };

                        for (float startPrice : startPrices) {
                                for (float endPrice : endPrices) {
                                        Auction auction = new Auction(
                                                        new Date().getTime(),
                                                        "Brand new mountain bike",
                                                        "Mountain Bike",
                                                        "Good",
                                                        0.0f,
                                                        AuctionType.descending,
                                                        AuctionCategory.Toys,
                                                        1L,
                                                        "mountainbike.jpg",
                                                        1.0f,
                                                        endPrice,
                                                        startPrice,
                                                        new Time(34200000),
                                                        new Time(0));
                                        boolean isValid = startPrice > endPrice;
                                        boolean isAuctionValid = auctionValidator.isAuctionValid(auction);

                                        assertEquals(isValid, isAuctionValid);
                                }
                        }
                }

                @Test
                void testDescendingAuctionStartPriceDecrementAmountRelationship() {
                        float[] startPrices = { 2.0f, 1.0f, 99.9f, 100.0f };
                        float[] decrementAmounts = { 1.0f, 100.0f, 101.0f, 50.0f };

                        for (float startPrice : startPrices) {
                                for (float decrementAmount : decrementAmounts) {
                                        Auction auction = new Auction(
                                                        new Date().getTime(),
                                                        "Brand new mountain bike",
                                                        "Mountain Bike",
                                                        "Good",
                                                        0.0f,
                                                        AuctionType.descending,
                                                        AuctionCategory.Toys,
                                                        1L,
                                                        "mountainbike.jpg",
                                                        decrementAmount,
                                                        1.0f,
                                                        startPrice,
                                                        new Time(34200000),
                                                        new Time(0));
                                        boolean isValid = startPrice > decrementAmount;
                                        boolean isAuctionValid = auctionValidator.isAuctionValid(auction);

                                        assertEquals(isValid, isAuctionValid);
                                }
                        }
                }
        }
        // ------------------------------------------
}
