import React from 'react';
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-ui/avatar";
import defaultPfp from "@/images/defaultpfp.png";
import config from "@/config";
import useSWR from "swr";
import LoadingSpinner from "./loadingSpinner";

const imgFetcher = (url) =>
  fetch(url)
    .then((res) => res.blob())
    .then((imgBlob) => URL.createObjectURL(imgBlob));

export default function ProfilePic({ picUrl, imageFromState, width, height }) {
  const {
    data: profilePicData,
    error: profilePicDataError,
    isLoading: profilePicDataIsLoading,
  } = useSWR(
    picUrl ? `${config.apiUrl}/users/image?key=${picUrl}` : null,
    imgFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 86400000,
      shouldRetryOnError: false,
    }
  );

  const sizeClass = `${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''}`.trim() || 'w-10 h-10';
  const avatarClassName = `hover:opacity-90 ${sizeClass}`;

  if (profilePicDataIsLoading) {
    return (
      <div className={`flex items-center justify-center ${avatarClassName}`}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Avatar className={avatarClassName}>
      <AvatarImage 
        src={imageFromState || profilePicData} 
        alt="Profile picture" 
        className="object-cover"
      />
      <AvatarFallback>
        <Image
          src={defaultPfp}
          alt="Default profile picture"
          width={128}
          height={128}
          className="h-full w-full rounded-full object-cover"
        />
      </AvatarFallback>
    </Avatar>
  );
}