"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";
import { useCookies } from "next-client-cookies";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserIsLoading, setcurrentUserIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  const token = useCookies().get("token");

  const userInfoFetcher = (url) =>
    fetch(url, { method: "POST", credentials: "include", body: token }).then(
      (res) => res.text()
    );

  const {
    data: subject,
    error: subjectError,
    isLoading: subjectIsLoading,
  } = useSWR(process.env.NEXT_PUBLIC_BASEURL + "/get-subject-from-token", userInfoFetcher);

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 3 } }).then((res) => res.json());

  const {
    data: currentUserData,
    error,
    isLoading,
  } = useSWR(
    subject != null && subject.includes("@")
      ? process.env.NEXT_PUBLIC_BASEURL + "/users/email?email=" + subject
      : process.env.NEXT_PUBLIC_BASEURL + "/users/username?username=" + subject,
    fetcher
  );

  useEffect(() => {
    if (currentUserData) {
      setCurrentUser(currentUserData);
      setcurrentUserIsLoading(false);
    }
    // if (error) {
    //   console.error('Error fetching user:', error);
    //   setIsError(true);
    //   setIsLoading(false);
    // }
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
