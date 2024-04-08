"use client";

import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-ui/avatar";

import config from "@/config";
import useSWR from "swr"

import LoadingSpinner from "./loadingSpinner";

export default function ProfilePic({picUrl, imageFromState}) {
  const imgFetcher = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then((imgBlob) => URL.createObjectURL(imgBlob));
    
      
  const {
    data: profilePicData,
    error: profilePicDataError,
    isLoading: profilePicDataIsLoading,
  } = useSWR(
    config.apiUrl + "/users/image?key=" + picUrl,
    imgFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 86400000, 
      shouldRetryOnError: false,
    }
  );
    
  if(profilePicDataIsLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      );
  }

  return (
      <Avatar className="h-32 w-32 hover:opacity-90">
        <AvatarImage src={imageFromState ?? profilePicData} alt="@avatar" />
        <AvatarFallback />
      </Avatar>
  );
}
