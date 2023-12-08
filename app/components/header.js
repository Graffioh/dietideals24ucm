"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BellIcon,
  Pencil1Icon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import ComboboxCategories from "./comboboxCategories";
import Searchbar from "./searchbar";

function Logo() {
  return (
    <div className="mb-3">
      <Link href="/" className="font-bold text-2xl">
        DIETIDEALS24
      </Link>
    </div>
  );
}

// *******************************
// Various header sections WEB
// *******************************

// Only notifications and profile icon
function LoggedPartialSection() {
  return (
    <div className="mr-7 flex justify-between mb-2">
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
      <div className="flex flex-grow gap-6 justify-between mx-48 mb-2">
        <ComboboxCategories />
        <Searchbar />
      </div>

      <div className="mt-0.5 mr-7 flex justify-between">
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

        <Link href="/public-profile" className="mt-0.5 flex justify-center">
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
    <Button variant="ghost" className="mx-2 mb-2">
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
    <div className="mr-7 flex  justify-between mb-2">
      <Link href="/private-profile">
        <Button variant="ghost" className="">
          <Pencil1Icon width="23" height="23" />
        </Button>
      </Link>

      <Link href="/">
        <Button variant="ghost" className="">
          <BellIcon width="23" height="23" />
        </Button>
      </Link>
    </div>
  );
}

// *******************************
// Various header sections MOBILE
// *******************************

// Only notifications and profile icon
function LoggedPartialSectionMobile() {
  return (
    <div className="flex justify-center flex-col gap-4">
      <Link href="/" className="text-white">
        <div>Notifications</div>
      </Link>

      <Link href="/private-profile" className="text-white">
        <div>Profile</div>
      </Link>
    </div>
  );
}

// Categories, searchbar, create auction, notifications, profile icon
function LoggedFullSectionMobile() {
  return (
    <>
      <div className="flex flex-grow flex-col gap-6 justify-between mx-48 mb-2">
        <ComboboxCategories />
        <Searchbar />
      </div>

      <div className="flex justify-center flex-col gap-4 mt-4">
        <Link href="/insert-auction" className="text-white">
          Insert auction
        </Link>

        <Link href="/" className="text-white">
          <div>Notifications</div>
        </Link>

        <Link
          href="/private-profile"
          className="text-white flex justify-center"
        >
          <div>Profile</div>
        </Link>
      </div>
    </>
  );
}

function OnlyNotificationsSectionMobile() {
  return (
    <Link href="/" className="text-white">
      <div>Notifications</div>
    </Link>
  );
}

function NotLoggedSectionMobile() {
  return (
    <Link href="/login" className="text-white">
      Log In
    </Link>
  );
}

// Modify profile icon and notifications
function ModifyProfileSectionMobile() {
  return (
    <div className="flex flex-col justify-center gap-4">
      <Link href="/" className="text-white">
        <div>Modify</div>
      </Link>

      <Link href="/" className="text-white">
        <div>Notifications</div>
      </Link>
    </div>
  );
}

// **************************************************************

export default function Header({ headerType }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  function handleHamburger() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  return (
    <>
      {/* Web */}
      <div className="bg-white hidden m-2 md:flex justify-between top-0 border-b">
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

      {/* Mobile */}
      {headerType === "headerEmpty" ? (
        <div className="bg-white md:hidden m-2 pb-1.5 flex justify-between sticky top-0 border-b">
          <div className="mt-1">
            <Logo />
          </div>
        </div>
      ) : (
        <div className="bg-white md:hidden m-2 pb-1.5 flex justify-between sticky top-0 border-b">
          <div className="mt-1">
            <Logo />
          </div>

          <div className="flex md:hidden" onClick={handleHamburger}>
            {isHamburgerOpen ? (
              <Button variant="ghost">
                <Cross1Icon width="23" height="23" />
              </Button>
            ) : (
              <Button variant="ghost">
                <HamburgerMenuIcon width="23" height="23" />
              </Button>
            )}
          </div>

          <div
            className={
              isHamburgerOpen
                ? "md:hidden absolute flex items-center justify-center bg-blue-950 min-h-[40vh] left-0 top-[100%] w-full rounded"
                : "hidden"
            }
          >
            <ul className="flex flex-col items-center">
              {headerType === "headerLoggedFull" && <LoggedFullSectionMobile />}
              {headerType === "headerLoggedPartial" && (
                <LoggedPartialSectionMobile />
              )}
              {headerType === "headerNotifications" && (
                <OnlyNotificationsSectionMobile />
              )}
              {headerType === "headerNotLogged" && <NotLoggedSectionMobile />}
              {headerType === "headerModifyProfile" && (
                <ModifyProfileSectionMobile />
              )}
              {headerType === "headerEmpty"}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
