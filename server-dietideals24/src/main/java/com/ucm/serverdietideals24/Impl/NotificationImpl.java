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
        return jdbcTemplate.query("SELECT * FROM notification",
                new BeanPropertyRowMapper<Notification>(Notification.class));
    }

    @Override
    public List<Notification> getAllViaUserId(Long userId) {
        return jdbcTemplate.query("SELECT * FROM notification WHERE idUserAccount = " + userId,
                new BeanPropertyRowMapper<Notification>(Notification.class));
    }

    @Override
    public void create(Notification noti) {
        jdbcTemplate.execute("INSERT INTO notification (id, auctionname, idoffer, idauction, iduseraccount) VALUES('"
                + noti.getId() + "', '" + noti.getAuctionName()
                + "', '0' , '" + noti.getIdAuction() + "', '" + noti.getIdUserAccount() + "')");
    }

    @Override
    public void delete(Long notiId) {
        jdbcTemplate.execute("DELETE FROM notification WHERE id = " + notiId);
    }
}
