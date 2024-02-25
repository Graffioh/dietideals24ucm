package com.ucm.serverdietideals24.DAO;

import java.util.List;

import com.ucm.serverdietideals24.Models.Notification;

public interface NotificationDAO {
    public List<Notification> getAll();

    public List<Notification> getAllViaUserId(Long userId);

    public void create(Notification noti);
    
    public void delete(Long notiId);
}

