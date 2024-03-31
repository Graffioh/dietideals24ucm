package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Controller.UserAccountController;
import com.ucm.serverdietideals24.Models.UserAccount;
import com.ucm.serverdietideals24.Util.UserAccountRegistrationValidator;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Date;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class UserAccountTests {

    private UserAccountRegistrationValidator userValidator;

    @BeforeEach
    private void setUp() {
        this.userValidator = new UserAccountRegistrationValidator();
    }

    @ParameterizedTest
    @CsvSource({
            "Umberto, Breglia, brr777, breglia@breglia.com, brbr172, true",
            "Andr£w, Ta$e, at, at@at.com, at1pw, false",
            "Guts, Casca, gclove232, gutscasca.com, 502er, false",
            "Anna, Oxa, aoxa, xo@xo.com, 123pw, true",
    })
    public void testIsUserAccountInfoValidForRegistration(String firstName, String lastName, String username,
            String email, String password, boolean expected) throws Exception {
        UserAccount userAccount = new UserAccount(new Date().getTime(), firstName, lastName, username, password, email);

        Boolean isValidResult = userValidator.isUserValidForRegistration(userAccount);
        assertEquals(expected, isValidResult);
    }
}