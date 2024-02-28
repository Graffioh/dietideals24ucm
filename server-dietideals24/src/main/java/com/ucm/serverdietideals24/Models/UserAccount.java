package com.ucm.serverdietideals24.Models;

import java.util.ArrayList;
import java.util.Date;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class UserAccount {
    @NonNull
    private Long id;

    @NonNull
    private String firstName, lastName, username, password, email; 
    
    private String telephoneNumber, biography, website, provider;
    
    private Date birthDate;

    private ArrayList<Offer> offers;

    private ArrayList<Auction> auctions;
}
