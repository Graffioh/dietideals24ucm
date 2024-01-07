package com.ucm.serverdietideals24.DAO;

import java.util.List;

import com.ucm.serverdietideals24.Models.UserAccount;

public interface UserAccountDAO {
    public List<UserAccount> getAll();

    public UserAccount getViaEmail(String email);

    public UserAccount getViaUsername(String username);

    public Long getIdViaEmailAndPassword(String email, String password);

    public void create(UserAccount user);

    public void update(String id, UserAccount user);
}
