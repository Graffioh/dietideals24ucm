package com.ucm.serverdietideals24.Models;

import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Getter;

@NoArgsConstructor
@AllArgsConstructor

public class DescendingAuction extends Auction {
    @Getter @Setter
    private float startPrice, timer, decrementAmount, minimumPrice;
}
