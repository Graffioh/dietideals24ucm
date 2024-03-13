package com.ucm.serverdietideals24.DAO;

import java.util.List;

import com.ucm.serverdietideals24.Models.Offer;

public interface OfferDAO {

    public void create(Offer entity);

    public List<Offer> getAllViaAuctionId(String auctionId);

    public Offer getHighestOffererIdViaAuctionId(String auctionId);
}
