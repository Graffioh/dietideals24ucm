package com.ucm.serverdietideals24.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ucm.serverdietideals24.DAO.NotificationDAO;
import com.ucm.serverdietideals24.Models.Notification;

@Repository
public class NotificationImpl implements NotificationDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Notification> getAll() {
        String sql = "SELECT * FROM notification";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Notification.class));
    }

    @Override
    public List<Notification> getAllViaUserId(Long userId) {
        String sql = "SELECT * FROM notification WHERE idUserAccount = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Notification.class), userId);
    }

    @Override
    public void create(Notification noti) {
        String sql = "INSERT INTO notification (id, auctionname, idauction, iduseraccount) VALUES (?, ?, ?, ?)";
        Object[] args = {
                noti.getId(),
                noti.getAuctionName(),
                noti.getIdAuction(),
                noti.getIdUserAccount()
        };
        jdbcTemplate.update(sql, args);
    }

    @Override
    public void delete(Long notiId, Long userId) {
        String sql = "DELETE FROM notification WHERE id = ? AND idUserAccount = ?";
        jdbcTemplate.update(sql, notiId, userId);
    }
}
