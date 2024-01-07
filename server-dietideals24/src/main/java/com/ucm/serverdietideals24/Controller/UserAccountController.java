package com.ucm.serverdietideals24.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.DAO.UserAccountDAO;
import com.ucm.serverdietideals24.Models.UserAccount;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserAccountController {
    @Autowired
    private UserAccountDAO userAccountDAO;

    // User from DB
    // *************************************************************
    @GetMapping("/users")
    public ResponseEntity<List<UserAccount>> fetchAllUsers() {
        try {
            List<UserAccount> users = userAccountDAO.getAll();

            return new ResponseEntity<List<UserAccount>>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<List<UserAccount>>(new ArrayList<UserAccount>(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user-from-email")
    public ResponseEntity<UserAccount> fetchUserBasedOnEmail(@RequestParam String email) {
        try {
            UserAccount user = userAccountDAO.getViaEmail(email);

            return new ResponseEntity<UserAccount>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<UserAccount>(new UserAccount(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user-from-username")
    public ResponseEntity<UserAccount> fetchUserBasedOnUsername(@RequestParam String username) {
        try {
            UserAccount user = userAccountDAO.getViaUsername(username);

            return new ResponseEntity<UserAccount>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<UserAccount>(new UserAccount(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> createUserAccount(@RequestBody UserAccount entity) {
        userAccountDAO.create(entity);

        return new ResponseEntity<UserAccount>(entity, HttpStatus.CREATED);
    }

    @PutMapping("/update-profile")
    public void updateUserAccount(@RequestParam String id, @RequestBody UserAccount entity) {
        userAccountDAO.update(id, entity);
    }
    // *************************************************************

    @GetMapping("/oauth-user")
    public OAuth2User oauthUser(@AuthenticationPrincipal OAuth2User principal) {
        return principal;
    }

}
