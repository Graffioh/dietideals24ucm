package com.ucm.serverdietideals24.Impl;

import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ucm.serverdietideals24.DAO.UserAccountDAO;
import com.ucm.serverdietideals24.Models.UserAccount;

@Repository
public class UserAccountImpl implements UserAccountDAO {
        private final JdbcTemplate jdbcTemplate;

        public UserAccountImpl(JdbcTemplate jdbcTemplate) {
                this.jdbcTemplate = jdbcTemplate;
        }

        @Override
        public List<UserAccount> getAll() {
                String sql = "SELECT * FROM useraccount";
                return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserAccount.class));
        }

        @Override
        public UserAccount getViaId(Long id) {
                String sql = "SELECT * FROM useraccount WHERE id = ?";
                return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserAccount.class), id)
                                .stream()
                                .findFirst()
                                .orElse(null);
        }

        @Override
        public Long getIdViaEmail(String email) {
                String sql = "SELECT id FROM useraccount WHERE email = ?";
                return jdbcTemplate.queryForObject(sql, Long.class, email);
        }

        @Override
        public UserAccount getViaEmail(String email) {
                String sql = "SELECT * FROM useraccount WHERE email = ?";
                return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserAccount.class), email)
                                .stream()
                                .findFirst()
                                .orElse(null);
        }

        @Override
        public UserAccount getViaUsername(String username) {
                String sql = "SELECT * FROM useraccount WHERE username = ?";
                return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserAccount.class), username)
                                .stream()
                                .findFirst()
                                .orElse(null);
        }

        @Override
        public void create(UserAccount user) {
                String sql = "INSERT INTO useraccount (id, firstName, lastName, username, password, birthDate, email, provider, profilePicUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                Object[] args = {
                                user.getId(),
                                user.getFirstName(),
                                user.getLastName(),
                                user.getUsername(),
                                user.getPassword(),
                                user.getBirthDate(),
                                user.getEmail(),
                                user.getProvider(),
                                user.getProfilePicUrl()
                };
                jdbcTemplate.update(sql, args);
        }

        @Override
        public void update(Long id, UserAccount user) {
                String sql = "UPDATE useraccount SET firstName = ?, lastName = ?, username = ?, password = ?, birthDate = ?, email = ?, telephoneNumber = ?, country = ?, biography = ?, website = ?, profilePicUrl = ? WHERE id = ?";
                Object[] args = {
                                user.getFirstName(),
                                user.getLastName(),
                                user.getUsername(),
                                user.getPassword(),
                                user.getBirthDate(),
                                user.getEmail(),
                                user.getTelephoneNumber(),
                                user.getCountry(),
                                user.getBiography(),
                                user.getWebsite(),
                                user.getProfilePicUrl(),
                                id
                };
                jdbcTemplate.update(sql, args);
        }

        @Override
        public void updatePassword(Long id, String password) {
                String sql = "UPDATE useraccount SET password = ? WHERE id = ?";
                Object[] args = {
                                password,
                                id
                };
                jdbcTemplate.update(sql, args);
        }

        @Override
        public Long getIdViaEmailAndPassword(String email, String password) {
                String sql = "SELECT id FROM useraccount WHERE email = ? AND password = ?";
                return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserAccount.class), email, password)
                                .getFirst().getId();
        }
}
