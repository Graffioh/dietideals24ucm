package com.ucm.serverdietideals24.Util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.regex.Pattern;

import com.ucm.serverdietideals24.Models.Auction;

public class AuctionValidatorUtil {

    private static final Pattern VALID_TITLE_PATTERN = Pattern.compile("^[a-zA-Z\\s]+$");
    private static final Pattern VALID_IMAGE_EXTENSION_PATTERN = Pattern.compile("(.*?)\\.(?:jpe?g|png)$",
            Pattern.CASE_INSENSITIVE);

    private static boolean isExpireDateValid(Date expireDate) {
        // Check if the date is in the past
        LocalDate currentDate = LocalDate.now();
        LocalDate expirationDate = expireDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        boolean isExpired = expirationDate.isBefore(currentDate);

        return !isExpired;
    }

    private static boolean isValidTitle(String title) {
        return VALID_TITLE_PATTERN.matcher(title).matches();
    }

    private static boolean isValidImageExtension(String image) {
        return VALID_IMAGE_EXTENSION_PATTERN.matcher(image).matches();
    }

    private static boolean areAttributesNull(Auction auction) {
        if (auction.getAuctionType() == null || auction.getAuctionCategory() == null
                || auction.getAuctionQuality() == null || auction.getAuctionName() == null
                || auction.getAuctionImages() == null) {
            return true;
        }

        String type = auction.getAuctionType().toString();

        switch (type) {
            case "fixedtime":
                return (auction.getExpireDate() == null || auction.getMinimumAcceptablePrice() == null);
            case "english":
                return (auction.getStartPrice() == null || auction.getRiseThreshold() == null);
            case "descending":
                return (auction.getStartPrice() == null || auction.getDecrementAmount() == null
                        || auction.getEndPrice() == null);
            default:
                return false;
        }
    }

    private static boolean areBaseAttributesValid(Auction auction) {
        String title = auction.getAuctionName();
        String image = auction.getAuctionImages();

        if (!isValidTitle(title) || !isValidImageExtension(image)) {
            return false;
        }

        return true;
    }

    private boolean isFixedTimeAuctionValid(Auction auction) {
        if (!areBaseAttributesValid(auction)) {
            return false;
        }

        Date expireDate = auction.getExpireDate();
        Float minimumAcceptablePrice = auction.getMinimumAcceptablePrice();

        if (!isExpireDateValid(expireDate) || minimumAcceptablePrice < 0 || minimumAcceptablePrice > 9999) {
            return false;
        }

        return true;
    }

    private boolean isEnglishAuctionValid(Auction auction) {
        if (!areBaseAttributesValid(auction)) {
            return false;
        }

        Float startPrice = auction.getStartPrice();
        Float riseThresholdPrice = auction.getRiseThreshold();

        if (startPrice < 0 || startPrice > 9999 || riseThresholdPrice <= 0 || riseThresholdPrice > 9999) {
            return false;
        }

        return true;
    }

    private boolean isDescendingAuctionValid(Auction auction) {
        if (!areBaseAttributesValid(auction)) {
            return false;
        }

        Float startPrice = auction.getStartPrice();
        Float decrementAmount = auction.getDecrementAmount();
        Float endPrice = auction.getEndPrice();

        if (decrementAmount >= startPrice || endPrice >= startPrice || startPrice < 0 || startPrice > 9999
                || decrementAmount <= 0
                || endPrice < 0) {
            return false;
        }

        return true;
    }

    public boolean isAuctionValid(Auction auction) {
        if (areAttributesNull(auction)) {
            return false;
        }

        String type = auction.getAuctionType().toString();

        switch (type) {
            case "fixedtime":
                return isFixedTimeAuctionValid(auction);
            case "english":
                return isEnglishAuctionValid(auction);
            case "descending":
                return isDescendingAuctionValid(auction);
            default:
                return false;
        }
    }
}
