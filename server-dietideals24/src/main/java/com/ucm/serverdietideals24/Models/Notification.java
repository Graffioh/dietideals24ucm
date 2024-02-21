package com.ucm.serverdietideals24.Models;

import io.micrometer.common.lang.NonNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Notification {
    @NonNull
    private Long id, idUserAccount, idAuction;
    
    @NonNull
    private String auctionName;
}
