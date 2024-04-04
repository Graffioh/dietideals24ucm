package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.UserAccount;
import com.ucm.serverdietideals24.Util.UserAccountRegistrationValidatorUtil;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.api.BeforeEach;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserAccountTests {

    private UserAccountRegistrationValidatorUtil userValidator;

    @BeforeEach
    private void setUp() {
        this.userValidator = new UserAccountRegistrationValidatorUtil();
    }
    
    private static Date parseDate(String dateStr) throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
    }

    @ParameterizedTest
    @CsvSource({
            "Umberto, Breglia, brr_777, breglia@breglia.com, brbr172, 1990-05-15, true",
            "Andr£w, Ta$e, at, at@at.com, at1pw, 2030-09-20, false",
            "Guts, Casca, gclove232, gutscasca.com, 502er, 2025-01-01, false",
            "Anna, Oxa, aoxa, xo@xo.com, 123pw, 1969-11-11, true",
    })
    public void testIsUserAccountInfoValidForRegistration(String firstName, String lastName, String username,
            String email, String password, String birthDateStr, boolean expected) throws Exception {
        // Arrange
        UserAccount userAccount = new UserAccount(new Date().getTime(), firstName, lastName, username, password, email, parseDate(birthDateStr));

        // Act
        Boolean isValidResult = userValidator.isUserValidForRegistration(userAccount);
        
        // Assert
        assertEquals(expected, isValidResult);
    }
}