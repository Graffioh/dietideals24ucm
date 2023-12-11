package com.ucm.serverdietideals24.Models;

import lombok.Getter;
import lombok.Setter;

public class Customer {
    @Getter @Setter
    private int id;

    @Getter @Setter
    private String firstName, lastName;

    public Customer() {
    }

    public Customer(int id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}