"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

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
import NotificationsDropdown from "./notificationsDropdown";

const notifications = [
  {
    value: "public-profile",
    label: "notification 1",
  },
  {
    value: "private-profile",
    label: "notification 2",
  },
  {
    value: "insert-auction",
    label: "notification 3",
  },
  {
    value: "/",
    label: "notification 4",
  },
];

function Logo() {
  return (
    <div className="mb-3">
      <Link href="/home" className="font-bold text-2xl">
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
    <div className="mr-3 flex justify-between mb-2">
      <NotificationsDropdown />

      <Link href="/public-profile" className="mt-0.5">
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

      <div className=" mr-3 flex justify-between">
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

        <NotificationsDropdown />

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

async function logOut() {
  try {
    await fetch(process.env.NEXT_PUBLIC_BASEURL + "/delete-login-token", {
      method: "GET",
      credentials: "include",
    });

    window.location.href = "/";
  } catch (e) {
    console.error("Error while deleting auth token in log out: " + e);
  }
}

function PrivateProfileSection() {
  return (
    <div className="flex mr-4">
      <Button onClick={logOut}>Log out</Button>
    </div>
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

function NotificationsSection() {
  return (
    <div className="mr-4 flex justify-between mb-2">
      <NotificationsDropdown />
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
      <Link href="/home" className="hover:text-stone-400">
        <div>Notifications</div>
      </Link>

      <Link
        href="/public-profile"
        className="hover:text-stone-400"
      >
        <div>Profile</div>
      </Link>
    </div>
  );
}

// Categories, searchbar, create auction, notifications, profile icon
function LoggedFullSectionMobile() {
  return (
    <>
      <div>
        <div className="mb-3">
          <ComboboxCategories />
        </div>
        <div>
          <Searchbar />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mt-4">
        <Link href="/insert-auction" className="hover:text-stone-400">
          Insert auction
        </Link>

        <Link href="/home" className="hover:text-stone-400">
          <div>Notifications</div>
        </Link>

        <Link
          href="/public-profile"
          className="hover:text-stone-400"
        >
          <div>Profile</div>
        </Link>
      </div>
    </>
  );
}

function PrivateProfileSectionMobile() {
  return (
    <div>
      <Button
        onClick={logOut}
        className="mb-1 ml-1.5 hover:text-stone-400"
        variant="none"
      >
        Log out
      </Button>
      <Link href="/home" className="hover:text-stone-400">
        <div>Notifications</div>
      </Link>
    </div>
  );
}

function NotLoggedSectionMobile() {
  return (
    <Link href="/login" className="hover:text-stone-400">
      Log In
    </Link>
  );
}

// **************************************************************

// **************************************************************

export default function Header({ headerType, token }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  function handleHamburger() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  return (
    <>
      {/* Web */}
      <div className="z-50 bg-white hidden m-2 md:flex justify-between top-0 border-b">
        <div className="mt-1">
          <Logo />
        </div>

        {headerType === "headerLoggedFull" &&
          token !== "no-token" &&
          token !== "" && <LoggedFullSection />}
        {headerType === "headerLoggedPartial" && <LoggedPartialSection />}
        {headerType === "headerPrivateProfile" && <PrivateProfileSection />}
        {(token === "no-token" || token === "") && <NotLoggedSection />}
        {headerType === "headerNotifications" && <NotificationsSection />}
        {headerType === "headerEmpty"}
      </div>

      {/* Mobile (thx chatgpt) */}
      {headerType === "headerEmpty" ? (
        <div className="bg-white md:hidden m-2 pb-1.5 flex justify-between sticky top-0 border-b">
          <div className="mt-1">
            <Logo />
          </div>
        </div>
      ) : (
        <div className="z-50 bg-white md:hidden m-2 pb-1.5 flex justify-between sticky top-0 border-b">
          <div className="mt-1">
            <Logo />
          </div>

          <div className="relative">
            {/* Hamburger Icon */}
            <button
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              className={`hamburger block mt-1.5 mr-2 z-10 relative focus:outline-none ${
                isHamburgerOpen ? "open" : ""
              }`}
            >
              <span
                className={`hamburger-box block w-6 h-0.5 bg-black my-1.5 transition duration-300 ease-in-out ${
                  isHamburgerOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`hamburger-box block w-6 h-0.5 bg-black my-1.5 transition duration-300 ease-in-out ${
                  isHamburgerOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`hamburger-box block w-6 h-0.5 bg-black my-1.5 transition duration-300 ease-in-out ${
                  isHamburgerOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>

            {/* Menu Options */}
            <div
              className={`menu ${
                isHamburgerOpen ? "flex" : "hidden"
              } flex-col items-center absolute top-full right-0 bg-white shadow-md mt-2 py-4 w-64 rounded`}
            >
              <div className="flex flex-col items-center">
                {headerType === "headerLoggedFull" &&
                  token !== "no-token" &&
                  token !== "" && <LoggedFullSectionMobile />}
                {headerType === "headerLoggedPartial" && (
                  <LoggedPartialSectionMobile />
                )}
                {headerType === "headerPrivateProfile" && (
                  <PrivateProfileSectionMobile />
                )}
                {(token === "no-token" || token === "") && (
                  <NotLoggedSectionMobile />
                )}
                {headerType === "headerEmpty"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
