"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";
import { BellIcon } from "@radix-ui/react-icons";

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
        <Button variant="ghost" className="mx-2">
          <BellIcon width="23" height="23" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandGroup>
            {notiData.map((noti) => (
              <div key={noti.id}>Auction: {noti.auctionName} has ended!</div>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
