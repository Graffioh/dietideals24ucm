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
    private String firstName;

    @NonNull
    private String lastName;

    @NonNull
    private String username; 

    @NonNull
    private String password;

    @NonNull
    private String email; 

    @NonNull
    private Date birthDate;
    
    private String country;
    private String telephoneNumber;
    private String biography;
    private String website; 
    private String provider;
    private String profilePicUrl; 

    private ArrayList<Offer> offers;

    private ArrayList<Auction> auctions;
}
