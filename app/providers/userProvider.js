"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";
import { useCookies } from "next-client-cookies";
import config from "@/config";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserIsLoading, setcurrentUserIsLoading] = useState(true);

  const authToken = useCookies().get("auth-token");

  const userInfoFetcher = (url) =>
    fetch(url, {
      method: "POST",
      credentials: "include",
      body: authToken,
    }).then((res) => res.text());

  const { data: subject, error: subjectError } = useSWR(
    config.apiUrl + "/get-subject-from-token",
    userInfoFetcher
  );

  if (subjectError) {
    console.error(
      "Error while fetching subject from auth token in user provider: " +
        subjectError
    );
  }

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 3 } }).then((res) => res.json());

  const { data: currentUserData, error: currentUserError } = useSWR(
    subject != null && subject.includes("@")
      ? config.apiUrl + "/users/email?email=" + subject
      : config.apiUrl + "/users/username?username=" + subject,
    fetcher
  );

  if (currentUserError) {
    console.error(
      "Error while fetching user from email or username in user provider: " +
        currentUserError
    );
  }

  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData);
      setcurrentUserIsLoading(false);
    }
  }, [currentUserData]);

  return (
    <UserContext.Provider value={{ currentUser, currentUserIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
