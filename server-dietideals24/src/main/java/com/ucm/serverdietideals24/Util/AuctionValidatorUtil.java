package com.ucm.serverdietideals24.Util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.regex.Pattern;

import com.ucm.serverdietideals24.Models.Auction;

public class AuctionValidatorUtil {

    private static final Pattern VALID_TITLE_PATTERN = Pattern.compile("^[a-zA-Z\\s]+$");
    private static final Pattern VALID_IMAGE_EXTENSION_PATTERN = Pattern.compile("(.*?)\\.(?:jpe?g|png)$", Pattern.CASE_INSENSITIVE);
    
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

    public boolean isAuctionValid(Auction auction) {
        String title = auction.getAuctionName();
        String type = auction.getAuctionType().toString();
        String image = auction.getAuctionImages();

        if (!isValidTitle(title) || !isValidImageExtension(image)) {
            return false;
        }

        if (type.equals("fixedtime")) {
            Date expireDate = auction.getExpireDate();
            Float minimumAcceptablePrice = auction.getMinimumAcceptablePrice();

            if (!isExpireDateValid(expireDate) || minimumAcceptablePrice < 0 || minimumAcceptablePrice > 9999) {
                return false;
            }

        } else if (type.equals("english")) {
            Float startPrice = auction.getStartPrice();
            Float riseThresholdPrice = auction.getRiseThreshold();

            if (startPrice < 0 || startPrice > 9999 || riseThresholdPrice < 0) {
                return false;
            }
        } else {
            Float startPrice = auction.getStartPrice();
            Float decrementAmount = auction.getDecrementAmount();
            Float endPrice = auction.getEndPrice();

            if (startPrice > decrementAmount || startPrice < 0 || startPrice > 9999 || decrementAmount < 0
                    || endPrice < 0) {
                return false;
            }
        }

        return true;
    }
}
