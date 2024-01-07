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
    public UserAccount getBasedOnEmail(String email) {
        return jdbcTemplate.query("SELECT * FROM useraccount WHERE email = '" + email + "'",
                new BeanPropertyRowMapper<UserAccount>(UserAccount.class)).getFirst();
    }

    @Override
    public UserAccount getBasedOnUsername(String username) {
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
                + "', piva = '" + user.getPiva() + "', telephoneNumber = '" + user.getTelephoneNumber()
                + "', biography = '" + user.getBiography() + "', website = '" + user.getWebsite() + "' WHERE id = '"
                + id + "'");
    }
}
