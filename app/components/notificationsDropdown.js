"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";
import { BellIcon, LapTimerIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useUserContext } from "@/app/(auth)/userProvider";

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
    process.env.NEXT_PUBLIC_BASEURL + "/notifications/" + cuid,
    fetcher
  );

  if (notiIsLoading) {
    return (
      <Button variant="ghost" className="mx-2">
        <BellIcon width="23" height="23" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button variant="ghost" className="z-1 mx-2">
            <BellIcon width="23" height="23" />
          </Button> */}

        <Button variant="ghost" className="relative">
          <BellIcon width="23" height="23" />
          <div className="absolute w-2.5 h-2.5 top-2.5 right-4 bg-red-500 rounded-full" hidden={notiData.length <= 0}></div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandGroup>
            {notiData.map((noti) => (
              <div className="flex border-b">
                <LapTimerIcon className="mt-3 mx-3" width={22} height={22} />
                <div className="" key={noti.id}>
                  Auction: {noti.auctionName} has ended!
                </div>
              </div>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
