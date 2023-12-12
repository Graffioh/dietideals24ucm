package com.ucm.serverdietideals24.Models;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

public class Offer {
    @Getter @Setter
    private int id;

    @Getter @Setter
    private float offerAmount;
}
