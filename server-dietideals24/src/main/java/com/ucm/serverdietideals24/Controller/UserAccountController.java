package com.ucm.serverdietideals24.Controller;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.util.IOUtils;
import com.ucm.serverdietideals24.DAO.UserAccountDAO;
import com.ucm.serverdietideals24.Models.UserAccount;
import com.ucm.serverdietideals24.Util.UserAccountRegistrationValidatorUtil;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "https://dietideals24.vercel.app",
        "https://dietideals24-git-deploy-render-vercel-graffioh.vercel.app" }, allowCredentials = "true")
@RequestMapping("/users")
public class UserAccountController {
    private final UserAccountDAO userAccountDAO;
    private final AmazonS3 amazonS3;

    public UserAccountController(UserAccountDAO userAccountDAO, AmazonS3 amazonS3) {
        this.userAccountDAO = userAccountDAO;
        this.amazonS3 = amazonS3;
    }

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

    @GetMapping("/get-id/{email}")
    public ResponseEntity<Long> fetchUserBasedOnId(@PathVariable String email) {
        try {
            Long id = userAccountDAO.getIdViaEmail(email);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(-1L);
        }
    }

    @GetMapping("/get-email/{email}")
    public ResponseEntity<Boolean> checkIsEmailAlreadyRegistered(@PathVariable String email) {
        try {
            Boolean check = userAccountDAO.isEmailAlreadyRegistered(email);
            return ResponseEntity.ok(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/get-username/{username}")
    public ResponseEntity<Boolean> checkIsUsernameAlreadyRegistered(@PathVariable String username) {
        try {
            Boolean check = userAccountDAO.isUsernameAlreadyRegistered(username);
            return ResponseEntity.ok(check);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
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
        UserAccountRegistrationValidatorUtil userValidator = new UserAccountRegistrationValidatorUtil();

        try {
            if (userValidator.isUserValidForRegistration(entity)) {
                userAccountDAO.create(entity);
                return ResponseEntity.status(HttpStatus.CREATED).body(entity);
            } else {
                throw new InvalidParameterException();
            }
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

    @PutMapping("/change-password/{id}")
    public ResponseEntity<Void> updatePassword(@PathVariable Long id, @RequestBody String password) {
        try {
            userAccountDAO.updatePassword(id, password);
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

    @Value("${aws.s3.bucketName}")
    private String S3bucketName;

    @PostMapping("/upload-img")
    public ResponseEntity<String> uploadImage(@RequestPart("file") MultipartFile file, @RequestParam String userId)
            throws IOException {
        String key = "users/" + userId + "/" + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        amazonS3.putObject(S3bucketName, key, file.getInputStream(), metadata);
        String imageUrlKey = key;

        return ResponseEntity.ok(imageUrlKey);
    }

    @GetMapping("/image")
    public ResponseEntity<byte[]> getImage(@RequestParam String key) throws IOException {
        S3Object s3Object = amazonS3.getObject(S3bucketName, key);
        InputStream inputStream = s3Object.getObjectContent();
        byte[] bytes = IOUtils.toByteArray(inputStream);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.parseMediaType(s3Object.getObjectMetadata().getContentType()));
        httpHeaders.setContentLength(s3Object.getObjectMetadata().getContentLength());
        return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
    }
}
