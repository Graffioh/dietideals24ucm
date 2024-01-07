package com.ucm.serverdietideals24.DAO;

import java.util.List;

import com.ucm.serverdietideals24.Models.UserAccount;

public interface UserAccountDAO {
    public List<UserAccount> getAll();

    public UserAccount getBasedOnEmail(String email);

    public UserAccount getBasedOnUsername(String username);

    public void create(UserAccount user);

    public void update(String id, UserAccount user);
}
