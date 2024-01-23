package com.ucm.serverdietideals24.DAO;

import java.util.List;

import com.ucm.serverdietideals24.Models.Auction;


public interface AuctionDAO {
    public List<Auction> getAll();

    public Auction getViaId(Long id);

    public void create(Auction auction);

    public void updateIsOver(Long id);
}
