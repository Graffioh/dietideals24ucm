package com.ucm.serverdietideals24.Models;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginRequest {
    private String email, password;
}
