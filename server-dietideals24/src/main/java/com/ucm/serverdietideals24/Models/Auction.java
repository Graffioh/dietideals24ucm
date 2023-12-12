package com.ucm.serverdietideals24.Models;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

public class Auction {
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String description, name, category, quality, images;

    @Getter @Setter
    private float currentOffer;

    @Getter @Setter
    private ArrayList<Offer> offers;
}
