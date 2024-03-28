package com.ucm.serverdietideals24.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ucm.serverdietideals24.DAO.UserAccountDAO;
import com.ucm.serverdietideals24.Models.UserAccount;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://dietideals24.vercel.app", "https://dietideals24-git-deploy-render-vercel-graffioh.vercel.app"}, allowCredentials = "true")
@RequestMapping("/users")
public class UserAccountController {
    @Autowired
    private UserAccountDAO userAccountDAO;

    // User from DB
    // *************************************************************
    @GetMapping
    public ResponseEntity<List<UserAccount>> fetchAllUsers() {
        try {
            List<UserAccount> users = userAccountDAO.getAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAccount> fetchUserBasedOnId(@PathVariable Long id) {
        try {
            UserAccount user = userAccountDAO.getViaId(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserAccount());
        }
    }

    @GetMapping("/email")
    public ResponseEntity<UserAccount> fetchUserBasedOnEmail(@RequestParam String email) {
        try {
            UserAccount user = userAccountDAO.getViaEmail(email);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserAccount());
        }
    }

    @GetMapping("/username")
    public ResponseEntity<UserAccount> fetchUserBasedOnUsername(@RequestParam String username) {
        try {
            UserAccount user = userAccountDAO.getViaUsername(username);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserAccount());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> createUserAccount(@RequestBody UserAccount entity) {
        try {
            userAccountDAO.create(entity);
            return ResponseEntity.status(HttpStatus.CREATED).body(entity);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserAccount());
        }
    }

    @PutMapping("/update-profile/{id}")
    public ResponseEntity<Void> updateUserAccount(@PathVariable Long id, @RequestBody UserAccount entity) {
        try {
            userAccountDAO.update(id, entity);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // *************************************************************

    @GetMapping("/oauth-user")
    public OAuth2User oauthUser(@AuthenticationPrincipal OAuth2User principal) {
        return principal;
    }
    
    // AWS S3 for images
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucketName}")
    private String S3bucketName;

    @PostMapping("/upload-img")
    public ResponseEntity<String> uploadImage(@RequestPart("file") MultipartFile file, @RequestParam String userId) throws IOException {
        String key = "users/" + userId + "/" + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        amazonS3.putObject(S3bucketName, key, file.getInputStream(), metadata);
        String imageUrl = "https://" + S3bucketName + ".s3.amazonaws.com/" + key;

        return ResponseEntity.ok(imageUrl);
    }
}
