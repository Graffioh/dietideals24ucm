package com.ucm.serverdietideals24.Models;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

public class EnglishAuction extends Auction {
    @Getter @Setter
    private float baseStartAuction, raiseThreshold;

    @Getter @Setter
    private String fixedTime;
}
