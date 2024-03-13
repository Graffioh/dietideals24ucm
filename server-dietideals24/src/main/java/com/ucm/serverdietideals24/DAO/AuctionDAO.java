package com.ucm.serverdietideals24.DAO;

import java.sql.Time;
import java.util.List;

import com.ucm.serverdietideals24.Models.Auction;

public interface AuctionDAO {
    public List<Auction> getAll();

    public List<Auction> getViaName(String name);

    public List<Auction> getViaCategory(String category);

    public List<Auction> getAllViaUserId(Long userId);

    public List<Auction> getAllPaginated(int pageNumber);

    public List<Auction> getAllPaginatedViaUserId(Long userId, int pageNumber);
    
    public List<Auction> getAllPaginatedViaOffers(Long userId, int pageNumber);

    public Auction getViaId(Long id);

    public List<Auction> getAllDescendingAuctions();

    public List<Auction> getAllEnglishAuctions();

    public void create(Auction auction);

    public void updateIsOver(Long id);

    public void updateCurrentOffer(Long id, Float newCurrentOffer);

    public void updateCurrentDecrementTimer(Long id, Time newTimerValue);

    public void updateCurrentOfferTimer(Long id, Time newTimerValue);
}
