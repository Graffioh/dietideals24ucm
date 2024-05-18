"use client";

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

export default function ProfilePic({ picUrl, imageFromState, width, height }) {
  const imgFetcher = (url) =>
    fetch(url)
      .then((res) => res.blob())
      .then((imgBlob) => URL.createObjectURL(imgBlob));

  const {
    data: profilePicData,
    error: profilePicDataError,
    isLoading: profilePicDataIsLoading,
  } = useSWR(config.apiUrl + "/users/image?key=" + picUrl, imgFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 86400000,
    shouldRetryOnError: false,
  });

  if (profilePicDataIsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const avatarClassName = `hover:opacity-90 ${width ? `w-${width}` : ""} ${
    height ? `h-${height}` : ""
  }`;

  return (
    <Avatar className={avatarClassName}>
      <AvatarImage src={imageFromState ?? profilePicData} alt="@avatar" />
      <AvatarFallback>
        <Image
          src={defaultPfp}
          alt="Fallback Avatar"
          width={500}
          height={500}
          className="h-full w-full rounded-full object-cover"
        />
      </AvatarFallback>
    </Avatar>
  );
}
