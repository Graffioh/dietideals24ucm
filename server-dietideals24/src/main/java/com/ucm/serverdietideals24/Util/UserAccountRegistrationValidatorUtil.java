package com.ucm.serverdietideals24.Util;

import java.util.Date;
import java.util.regex.Pattern;

import com.ucm.serverdietideals24.Models.UserAccount;

public class UserAccountRegistrationValidatorUtil {

    private static final Pattern VALID_NAME_PATTERN = Pattern.compile("^[a-zA-Z\\s]+$");
    private static final Pattern VALID_EMAIL_PATTERN = Pattern
            .compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final String ALLOWED_SPECIAL_CHARACTERS = "_-";

    private static boolean isValidName(String name) {
        return VALID_NAME_PATTERN.matcher(name).matches();
    }

    private static boolean isValidEmail(String email) {
        return VALID_EMAIL_PATTERN.matcher(email).matches();
    }

    private static boolean isUsernameValid(String username) {
        for (char c : username.toCharArray()) {
            if (!Character.isLetterOrDigit(c) && !ALLOWED_SPECIAL_CHARACTERS.contains(String.valueOf(c))) {
                return false;
            }
        }
        return true;
    }

    private static boolean isBirthdateValid(Date birthDate) {
        Date currentDate = new Date();
        return birthDate.before(currentDate);
    }

    public boolean isUserValidForRegistration(UserAccount user) {
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String email = user.getEmail();
        String username = user.getUsername();
        Date birthDate = user.getBirthDate();
        // Can't test the password because it's hashed

        if (!isValidName(firstName) || !isValidName(lastName)) {
            return false;
        }

        if (!isValidEmail(email)) {
            return false;
        }

        if (!isUsernameValid(username)) {
            return false;
        }

        if (!isBirthdateValid(birthDate)) {
            return false;
        }

        return true;
    }
}