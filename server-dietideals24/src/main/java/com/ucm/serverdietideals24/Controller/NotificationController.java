package com.ucm.serverdietideals24.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucm.serverdietideals24.DAO.NotificationDAO;
import com.ucm.serverdietideals24.Models.Notification;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/notifications")
public class NotificationController {
    @Autowired
    private NotificationDAO notificationDAO;

    @GetMapping
    public ResponseEntity<List<Notification>> fetchAllNotifications() {
        try {
            List<Notification> notis = notificationDAO.getAll();
            return ResponseEntity.ok(notis);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> fetchAllNotificationsBasedOnUserId(@PathVariable Long userId) {
        try {
            List<Notification> notis = notificationDAO.getAllViaUserId(userId);
            return ResponseEntity.ok(notis);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ArrayList<>());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Notification> createNotification(@RequestBody Notification noti) {
        try {
            notificationDAO.create(noti);
            return ResponseEntity.status(HttpStatus.CREATED).body(noti);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Notification());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Notification> deleteNotification(@RequestBody Long notiId) {
        // ...
        return null;
    }
}