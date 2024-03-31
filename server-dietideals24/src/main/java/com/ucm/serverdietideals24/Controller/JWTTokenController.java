package com.ucm.serverdietideals24.Controller;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.DAO.UserAccountDAO;
import com.ucm.serverdietideals24.Models.UserFromLoginForm;
import com.ucm.serverdietideals24.Util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://dietideals24.vercel.app", "https://dietideals24-git-deploy-render-vercel-graffioh.vercel.app"}, allowCredentials = "true")
public class JWTTokenController {
    @Autowired
    private UserAccountDAO userAccountDAO;

    // JWT Token handling
    // *************************************************************
    @PostMapping("/generate-login-token")
    public ResponseEntity<String> generateLoginToken(@RequestBody UserFromLoginForm loginReq) {
        Long userId = -1L;

        try {
            userId = userAccountDAO.getIdViaEmailAndPassword(loginReq.getEmail(), loginReq.getPassword());
        } catch (NoSuchElementException e) {
            System.out.println("Error, invalid email or password sent to login route.");
        }

        if (userId != -1) {
            String token = JwtUtil.generateToken(loginReq.getEmail());
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }

        return new ResponseEntity<String>("no-token", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/set-login-token")
    public ResponseEntity<String> setLoginToken(@RequestBody String token, HttpServletResponse response) {
        Cookie tokenCookie = new Cookie("auth-token", token);
        tokenCookie.setSecure(false);
        tokenCookie.setHttpOnly(false);
        tokenCookie.setMaxAge(100000000);
        tokenCookie.setPath("/");

        response.addCookie(tokenCookie);

        return new ResponseEntity<String>("Cookie token set successfully.", HttpStatus.OK);
    }

    @GetMapping("/get-login-token")
    public ResponseEntity<String> getLoginToken(@CookieValue(name = "auth-token", required = false) String tokenFromCookie) {
        if (tokenFromCookie != null) {
            return new ResponseEntity<String>(tokenFromCookie, HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("no-token", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/delete-login-token")
    public ResponseEntity<String> deleteLoginToken(HttpServletResponse response) {
        Cookie tokenCookie = new Cookie("auth-token", null);
        tokenCookie.setSecure(false);
        tokenCookie.setHttpOnly(false);
        tokenCookie.setMaxAge(0);
        tokenCookie.setPath("/");

        response.addCookie(tokenCookie);

        return new ResponseEntity<String>("Cookie auth token delete successfully.", HttpStatus.OK);
    }

    @PostMapping("/get-subject-from-token")
    public ResponseEntity<String> getSubjectFromToken(@RequestBody String token) {
        String subject = "";

        try {
            subject = JwtUtil.extractSubjectViaToken(token);
        } catch (NoSuchElementException nsee) {
            return new ResponseEntity<String>("no-token", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("no-token", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<String>(subject, HttpStatus.ACCEPTED);
    }
    // *************************************************************

}
