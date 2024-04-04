"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";
import { BellIcon, LapTimerIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import useSWR from "swr";
import { Button } from "@/components/shadcn-ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/shadcn-ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";

import { useUserContext } from "@/app/providers/userProvider";
import config from "@/config";

export default function NotificationsDropdown() {
  const { currentUser, currentUserIsLoading } = useUserContext();

  const [open, setOpen] = React.useState(false);

  const fetcher = (url) =>
    fetch(url, { next: { revalidate: 0 } }).then((res) => res.json());

  const cuid = currentUser ? currentUser.id : -1;

  const {
    data: notiData,
    error: notiError,
    isLoading: notiIsLoading,
  } = useSWR(
    config.apiUrl + "/notifications/" + cuid,
    fetcher, { refreshInterval: 100 }
  );

  const notiLength = notiData ? notiData.length : 0

  if (notiIsLoading) {
    return (
      <Button variant="ghost" className="mx-2">
        <BellIcon width="23" height="23" />
      </Button>
    );
  }

  async function deleteNotification(notiId, userId) {
    try {
      const response = await fetch(
        config.apiUrl +
          "/notifications/delete?notiId=" +
          notiId + "&userId=" + userId,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("There was an error:", error);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="mx-2 relative">
          <BellIcon width="23" height="23" />
          <div
            className="absolute w-2.5 h-2.5 top-2.5 right-4 bg-red-500 rounded-full"
            hidden={notiLength <= 0}
          ></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 bg-white">
        <Command>
          <CommandGroup>
            {notiLength > 0 ? (
              notiData.map((noti) => (
                <div key={noti.id} className="flex border-b items-center justify-between">
                  <div className="flex items-center">
                    <LapTimerIcon
                      className="flex-none mx-3"
                      width={22}
                      height={22}
                    />
                    <div className="" key={noti.id}>
                      Auction: <b>{noti.auctionName}</b> has ended!
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      deleteNotification(noti.id, currentUser.id);
                    }}
                    className="m-2"
                  >
                    <CheckIcon width={22} height={22} />
                  </Button>
                </div>
              ))
            ) : (
              <div className="m-2">No notifications.</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
