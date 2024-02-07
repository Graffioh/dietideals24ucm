package com.ucm.serverdietideals24.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ucm.serverdietideals24.DAO.UserAccountDAO;
import com.ucm.serverdietideals24.Models.UserAccount;

@Repository
public class UserAccountImpl implements UserAccountDAO {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<UserAccount> getAll() {
        return jdbcTemplate.query("SELECT * FROM useraccount",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class));
    }

    @Override
    public UserAccount getViaId(Long id) {
        return jdbcTemplate.query("SELECT * FROM useraccount WHERE id = '" + id + "'",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
    }

    @Override
    public UserAccount getViaEmail(String email) {
        return jdbcTemplate.query("SELECT * FROM useraccount WHERE email = '" + email + "'",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
    }

    @Override
    public UserAccount getViaUsername(String username) {
        return jdbcTemplate.query("SELECT * FROM useraccount WHERE username = '" + username + "'",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
    }

    @Override
    public void create(UserAccount user) {
        jdbcTemplate.execute("INSERT INTO useraccount VALUES('" + user.getId() + "', '" + user.getFirstName()
                + "', '" + user.getLastName() + "', '" + user.getUsername() + "', '" + user.getPassword()
                + "', '"
                + user.getBirthDate() + "', '" + user.getEmail() + "')");
    }

    @Override
    public void update(String id, UserAccount user) {
        jdbcTemplate.update("UPDATE useraccount SET firstName = '" + user.getFirstName() + "', lastName = '"
                + user.getLastName() + "', username = '" + user.getUsername() + "', password = '"
                + user.getPassword() + "', birthDate = '" + user.getBirthDate() + "', email = '" + user.getEmail()
                + "', telephoneNumber = '" + user.getTelephoneNumber()
                + "', biography = '" + user.getBiography() + "', website = '" + user.getWebsite() + "' WHERE id = '"
                + id + "'");
    }

    @Override
    public Long getIdViaEmailAndPassword(String email, String password) {
        return jdbcTemplate.query(
                "SELECT id FROM useraccount WHERE email = '" + email + "' AND password = '"
                        + password + "'",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst().getId();
    }
}
