package com.ucm.serverdietideals24;

import com.ucm.serverdietideals24.Models.UserAccount;
import com.ucm.serverdietideals24.Util.UserAccountRegistrationValidatorUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Nested;

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

    private static Date parseDate(String dateStr) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
        } catch (ParseException e) {
            System.err.println("Error parsing date: " + dateStr);
            return null;
        }
    }

    // REGISTRAZIONE
    // ------------------------------------------
    @Nested
    class UserAccountRegistrationValidation {
        @Test
        public void testUserAccountName() {
            // Arrange
            // **********************************************
            UserAccount validUserAccount1 = new UserAccount(new Date().getTime(), "Umberto", "Breglia", "brr_777",
                    "brbr172",
                    "breglia@breglia.com",
                    parseDate("1990-05-15"));

            // Name not valid
            UserAccount invalidUserAccount1 = new UserAccount(new Date().getTime(), "Umberto$", "Breg//ia", "brr_777",
                    "brbr172",
                    "breglia@breglia.com",
                    parseDate("1990-05-15"));
            // **********************************************

            // Act
            // **********************************************
            Boolean isUserAccountValid1 = userValidator.isUserValidForRegistration(validUserAccount1);
            Boolean isUserAccountValid2 = userValidator.isUserValidForRegistration(invalidUserAccount1);
            // **********************************************

            // Assert
            // **********************************************
            assertEquals(true, isUserAccountValid1);
            assertEquals(false, isUserAccountValid2);
            // **********************************************
        }

        @Test
        public void testUserAccountEmail() {
            // Arrange
            // **********************************************
            UserAccount validUserAccount1 = new UserAccount(new Date().getTime(), "Andrea", "Rossi", "arossi",
                    "arossirossi",
                    "andrea.rossi@gmail.com",
                    parseDate("2000-10-01"));

            // Email not valid
            UserAccount invalidUserAccount1 = new UserAccount(new Date().getTime(), "Andrea", "Rossi", "arossi",
                    "arossirossi",
                    "andrea.rossi-gmail.com",
                    parseDate("2000-10-01"));
            // **********************************************

            // Act
            // **********************************************
            Boolean isUserAccountValid1 = userValidator.isUserValidForRegistration(validUserAccount1);
            Boolean isUserAccountValid2 = userValidator.isUserValidForRegistration(invalidUserAccount1);
            // **********************************************

            // Assert
            // **********************************************
            assertEquals(true, isUserAccountValid1);
            assertEquals(false, isUserAccountValid2);
            // **********************************************
        }

        @Test
        public void testUserAccountUsername() {
            // Arrange
            // **********************************************
            UserAccount validUserAccount1 = new UserAccount(new Date().getTime(), "Francesca", "Verde", "francy22",
                    "fraverde1990",
                    "francesca.verde2@outlook.com",
                    parseDate("1990-07-21"));

            // Username not valid
            UserAccount invalidUserAccount1 = new UserAccount(new Date().getTime(), "Francesca", "Verde",
                    "francy22_-%%", "fraverde1990",
                    "francesca.verde2@outlook.com",
                    parseDate("1990-07-21"));
            // **********************************************

            // Act
            // **********************************************
            Boolean isUserAccountValid1 = userValidator.isUserValidForRegistration(validUserAccount1);
            Boolean isUserAccountValid2 = userValidator.isUserValidForRegistration(invalidUserAccount1);
            // **********************************************

            // Assert
            // **********************************************
            assertEquals(true, isUserAccountValid1);
            assertEquals(false, isUserAccountValid2);
            // **********************************************
        }

        @Test
        public void testUserAccountBirthDate() {
            // Arrange
            // **********************************************
            UserAccount validUserAccount1 = new UserAccount(new Date().getTime(), "Thomas", "Pocoturbato",
                    "destroyer12_12", "napoli123",
                    "nonturbatothom@gmail.com",
                    parseDate("2002-11-20"));

            // BirthDate in the future not valid
            UserAccount invalidUserAccount1 = new UserAccount(new Date().getTime(), "Thomas", "Pocoturbato",
                    "destroyer12_12", "napoli123",
                    "nonturbatothom@gmail.com",
                    parseDate("2025-11-20"));
            // **********************************************

            // Act
            // **********************************************
            Boolean isUserAccountValid1 = userValidator.isUserValidForRegistration(validUserAccount1);
            Boolean isUserAccountValid2 = userValidator.isUserValidForRegistration(invalidUserAccount1);
            // **********************************************

            // Assert
            // **********************************************
            assertEquals(true, isUserAccountValid1);
            assertEquals(false, isUserAccountValid2);
            // **********************************************
        }
    }
    // ------------------------------------------
}