package com.ucm.serverdietideals24.Models;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String firstName, lastName, username, password, birthDate, mail, piva, telephoneNumber, biography, website;

    @Getter @Setter
    private ArrayList<Offer> offers;

    @Getter @Setter
    private ArrayList<Auction> auctions;
}
