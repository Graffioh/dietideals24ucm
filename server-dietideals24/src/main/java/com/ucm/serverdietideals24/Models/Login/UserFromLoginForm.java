package com.ucm.serverdietideals24.Models.Login;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserFromLoginForm {
    private String email;
    private String password;
}
