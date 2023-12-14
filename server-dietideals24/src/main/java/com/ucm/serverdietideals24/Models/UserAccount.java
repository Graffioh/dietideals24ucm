package com.ucm.serverdietideals24.Models;

import java.util.ArrayList;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

public class UserAccount {
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String firstName, lastName, username, password, mail, piva, telephoneNumber, biography, website;
    
    @Getter @Setter
    private Date birthDate;

    @Getter @Setter
    private ArrayList<Offer> offers;

    @Getter @Setter
    private ArrayList<Auction> auctions;
}
