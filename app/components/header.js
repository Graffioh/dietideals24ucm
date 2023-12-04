"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BellIcon,
  Pencil1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import ComboboxCategories from "./comboboxCategories";
import Searchbar from "./searchbar";

function Logo() {
  return (
    <Link href="/" className="font-bold text-2xl">
      DIETIDEALS24
    </Link>
  );
}

// *******************************
// Various header sections
// *******************************

// Only notifications and profile icon
function LoggedPartialSection() {
  return (
    <div className="mr-8 flex justify-between">
      <Button variant="ghost" className="mx-2">
        <BellIcon width="23" height="23" />
      </Button>
      <Link href="/private-profile" className="mt-0.5">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
          <AvatarFallback>gojo</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}

// Categories, searchbar, create auction, notifications, profile icon
function LoggedFullSection() {
  return (
    <>
      <div className="flex flex-grow justify-between mx-48 mb-2">
        <ComboboxCategories />
        <Searchbar />
      </div>

      <div className="mr-7 flex justify-between">
        <Link
          href="/insert-auction"
          className={cn(
            buttonVariants({
              variant: "default",
              size: "default",
              className: "h-9",
            })
          )}
        >
          Insert auction
        </Link>
        <Button variant="ghost" className="mx-2">
          <BellIcon width="23" height="23" />
        </Button>
        <Link href="/private-profile" className="mt-0.5">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
            <AvatarFallback>gojo</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </>
  );
}

function OnlyNotificationsSection() {
  return (
    <Button variant="ghost" className="mx-2">
      <BellIcon width="23" height="23" />
    </Button>
  );
}

function NotLoggedSection() {
  return (
    <Link
      href="/login"
      className={cn(
        buttonVariants({
          variant: "default",
          size: "default",
          className: "h-9 mr-4",
        })
      )}
    >
      Log In
    </Link>
  );
}

// Modify profile icon and notifications
function ModifyProfileSection() {
  return (
    <div className="mr-8 flex justify-between">
      <Button variant="ghost" className="">
        <Pencil1Icon width="23" height="23" />
      </Button>

      <Button variant="ghost" className="">
        <BellIcon width="23" height="23" />
      </Button>
    </div>
  );
}

export default function Header({ headerType }) {
  return (
    <>
      <div className="hidden m-2 md:flex justify-between sticky top-0 border-b">
        <div className="mt-1">
          <Logo />
        </div>

        {headerType === "headerLoggedFull" && <LoggedFullSection />}
        {headerType === "headerLoggedPartial" && <LoggedPartialSection />}
        {headerType === "headerNotifications" && <OnlyNotificationsSection />}
        {headerType === "headerNotLogged" && <NotLoggedSection />}
        {headerType === "headerModifyProfile" && <ModifyProfileSection />}
        {headerType === "headerEmpty"}
      </div>

      <div className="md:hidden m-2 pb-1.5 flex justify-between sticky top-0 border-b">
        <div className="mt-1">
          <Logo />
        </div>

        <div className="flex md:hidden">
          <Button variant="ghost">
            <HamburgerMenuIcon width="23" height="23" />
          </Button>
        </div>
      </div>
    </>
  );
}
