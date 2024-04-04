package com.ucm.serverdietideals24.Models;

import lombok.NoArgsConstructor;
import io.micrometer.common.lang.NonNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Offer {
    @NonNull
    private Long id;

    private float offerAmount;

    @NonNull
    private Long idUserAccount;

    @NonNull
    private Long idAuction;
}
