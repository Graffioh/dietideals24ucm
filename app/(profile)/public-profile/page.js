"use client";

import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";

// import getCurrentUserServer from "@/app/(auth)/getCurrentUserServer";
import AuctionsContainerPublicProfile from "@/app/components/auctionsContainerPublicProfile";
import ShowMoreDetailsPublicProfile from "@/app/components/showMoreDetailsPublicProfile";
import LoadingSpinner from "@/app/components/loadingSpinner";
import { useUserContext } from "@/app/providers/userProvider";

export default function ProfilePage({ searchParams }) {
  const { currentUser } = useUserContext();
  
  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 1 } }).then((res) => res.json());

  const {
    data: userById,
    error: userByIdError,
    isLoading: userByIdIsLoading,
  } = useSWR(
    process.env.NEXT_PUBLIC_BASEURL + "/users/" + searchParams.id,
    fetcher
  );
  
  // if searchParams is not present or if searchParams.id == currentUser.id,
  //   then display currentUser, otherwise display the queried user by id
  const publicProfileUser = searchParams.id
    ? currentUser
      ? currentUser.id !== searchParams.id
        ? userById
        : currentUser
      : {}
    : currentUser;

  if(searchParams.id && userByIdIsLoading || !publicProfileUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex md:flex-row flex-col mt-16 md:mx-[15em] mx-3 items-center">
        <div className="md:flex-col w-full mt-1 md:mt-0">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="flex">
              <div className="mt-2 mr-4 md:mr-10">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src="https://i.scdn.co/image/ab676161000051744e975208a929cd58c552c55b"
                    alt="@avatar"
                  />
                  <AvatarFallback />
                </Avatar>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full">
                  <h1 className="font-bold text-4xl md:text-5xl">
                    {publicProfileUser ? publicProfileUser.username : "none"}
                  </h1>

                  {publicProfileUser.id === currentUser.id ? (
                    <Link href="/private-profile?type=update">
                      <Button
                        variant="ghost"
                        className="md:mt-1.5 mt-1 px-0.5 md:px-1"
                      >
                        <Pencil1Icon width="23" height="23" />
                      </Button>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>

                <ShowMoreDetailsPublicProfile
                  publicProfileUser={publicProfileUser}
                />
              </div>
            </div>
          </div>
          <Textarea
            className="resize-none mt-4"
            placeholder=""
            defaultValue={
              publicProfileUser ? publicProfileUser.biography : "none"
            }
            readOnly={true}
          />
        </div>
      </div>

      <AuctionsContainerPublicProfile
        publicProfileUserId={searchParams.id ?? currentUser.id}
      />
    </>
  );
}