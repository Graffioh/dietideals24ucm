package com.ucm.serverdietideals24.DAO;

import java.util.List;

import com.ucm.serverdietideals24.Models.UserAccount;

public interface UserAccountDAO {
    public List<UserAccount> getAll();

    public UserAccount getViaId(Long id);

    public Long getIdViaEmail(String email);

    public Boolean isEmailAlreadyRegistered(String email);
    public Boolean isUsernameAlreadyRegistered(String username);

    public UserAccount getViaEmail(String email);

    public UserAccount getViaUsername(String username);

    public Long getIdViaEmailAndPassword(String email, String password);

    public void create(UserAccount user);

    public void update(Long id, UserAccount user);

    public void updatePassword(Long id, String password);
}
