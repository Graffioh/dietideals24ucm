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
      <NotificationsDropdown notifications={notifications} />

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

        <NotificationsDropdown notifications={notifications} />

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
    console.error("Error while deleting token in log out: " + e);
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

// Modify profile icon and notifications
// function ModifyProfileSection() {
//   return (
//     <div className="mr-4 flex justify-between mb-2">
//       <Link href="/private-profile?type=update">
//         <Button variant="ghost" className="">
//           <Pencil1Icon width="23" height="23" />
//         </Button>
//       </Link>

//       <NotificationsDropdown notifications={notifications} />
//     </div>
//   );
// }

function NotificationsSection() {
  return (
    <div className="mr-4 flex justify-between mb-2">
      <NotificationsDropdown notifications={notifications} />
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
      <Link href="/home" className="text-white">
        <div>Notifications</div>
      </Link>

      <Link href="/private-profile?type=update" className="text-white">
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

        <Link href="/home" className="text-white">
          <div>Notifications</div>
        </Link>

        <Link
          href="/private-profile?type=update"
          className="text-white flex justify-center"
        >
          <div>Profile</div>
        </Link>
      </div>
    </>
  );
}

function PrivateProfileSectionMobile() {
  return (
    <Link href="/home" className="text-white">
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
// function ModifyProfileSectionMobile() {
//   return (
//     <div className="flex flex-col justify-center gap-4">
//       <Link href="/home" className="text-white">
//         <div>Modify</div>
//       </Link>

//       <Link href="/home" className="text-white">
//         <div>Notifications</div>
//       </Link>
//     </div>
//   );
// }

// **************************************************************

// **************************************************************

export default function Header({ headerType, token }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  function handleHamburger() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   async function getAndSetToken() {
  //     const res = await fetch("http://localhost:8080/get-login-token", {
  //       method: "GET",
  //       credentials: "include",
  //       next: { revalidate: 2 },
  //     });
  //     const resText = await res.text();

  //     setToken(resText);
  //   }

  //   getAndSetToken();
  // }, []);

  return (
    <>
      {/* Web */}
      <div className="bg-white hidden m-2 md:flex justify-between top-0 border-b">
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
              {headerType === "headerPrivateProfile" && (
                <PrivateProfileSectionMobile />
              )}
              {headerType === "headerNotLogged" && <NotLoggedSectionMobile />}
              {headerType === "headerEmpty"}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
