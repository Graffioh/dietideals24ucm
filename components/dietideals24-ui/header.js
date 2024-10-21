"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import ComboboxCategories from "./comboboxCategories";
import Searchbar from "./searchbar";
import NotificationsDropdown from "./notificationsDropdown";
import { useUserContext } from "../../app/providers/userProvider";
import config from "@/config";
import Image from "next/image";
import dietidealsLogo from "@/images/dietidealslogo.png";
import ProfilePic from "./profilePic";

function Logo() {
  return (
    <Link href="/home" className="font-bold text-2xl">
      <div className="mb-3 flex items-center">
        <div className="relative w-8 h-8">
          <Image
            alt="dietideals-logo"
            src={dietidealsLogo}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <span>IETIDEALS24</span>
      </div>
    </Link>
  );
}

// *******************************
// Various header sections DESKTOP
// *******************************
//
function LoggedSection() {
  function isUserAdult(birthDateString) {
    var birthDate = new Date(birthDateString);
    var currentDate = new Date();

    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var m = currentDate.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }

  const { currentUser } = useUserContext();

  return isUserAdult(currentUser ? currentUser.birthDate : new Date()) ? (
    <LoggedFullSection />
  ) : (
    <LoggedPartialSection />
  );
}

function LoggedPartialSection() {
  const { currentUser } = useUserContext();

  return (
    <div className="mr-3 flex justify-between mb-2">
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

      <Link href="/public-profile" className="mt-0.5">
        <ProfilePic picUrl={currentUser?.profilePicUrl} width={9} height={9} />
      </Link>
    </div>
  );
}

// Categories, searchbar, create auction, notifications, profile icon
function LoggedFullSection() {
  const { currentUser } = useUserContext();

  return (
    <>
      <div className="flex flex-grow gap-6 justify-between mx-48 mb-2">
        <ComboboxCategories onCategoryChange={() => {}} />
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
          <ProfilePic
            picUrl={currentUser?.profilePicUrl}
            width={9}
            height={9}
          />
        </Link>
      </div>
    </>
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

// async function logOut() {
//   try {
//     await fetch(config.apiUrl + "/delete-login-token", {
//       method: "GET",
//       credentials: "include",
//     });

//     window.location.href = "/";
//   } catch (e) {
//     console.error("Error while deleting auth token in log out: " + e);
//   }
// }

// function PrivateProfileSection() {
//   return (
//     // <div className="flex mr-4">
//     //   <Button
//     //     variant="ghost"
//     //     className="px-1.5"
//     //     onClick={logOut}
//     //   >
//     //     <ExitIcon width="25" height="25" className="text-red-500" />
//     //   </Button>
//     // </div>
//     <LoggedPartialSection />
//   );
// }

// function NotificationsSection() {
//   return (
//     <div className="mr-4 flex justify-between mb-2">
//       <NotificationsDropdown />
//     </div>
//   );
// }

// *******************************
// Various header sections MOBILE
// *******************************
function LoggedSectionMobile() {
  function isUserAdult(birthDateString) {
    var birthDate = new Date(birthDateString);
    var currentDate = new Date();

    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var m = currentDate.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }

  const { currentUser } = useUserContext();

  return isUserAdult(currentUser ? currentUser.birthDate : new Date()) ? (
    <LoggedFullSectionMobile />
  ) : (
    <LoggedPartialSectionMobile />
  );
}

// Only notifications and profile icon
function LoggedPartialSectionMobile() {
  return (
    <div className="flex justify-center flex-col gap-4">
      <Link href="/insert-auction" className="hover:text-stone-400">
        Insert auction
      </Link>

      <Link href="/public-profile" className="hover:text-stone-400">
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

        <Link href="/public-profile" className="hover:text-stone-400">
          <div>Profile</div>
        </Link>
      </div>
    </>
  );
}

// function PrivateProfileSectionMobile() {
//   return (
//     // <div>
//     //   <Button
//     //     variant="ghost"
//     //     className="px-1.5"
//     //     onClick={logOut}
//     //   >
//     //     Log out
//     //   </Button>
//     // </div>
//     <LoggedPartialSectionMobile />
//   );
// }

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

  return (
    <>
      {/* Web */}
      <div className="z-50 bg-white hidden m-2 md:flex justify-between top-0 border-b">
        <div className="mt-1">
          <Logo />
        </div>

        {headerType === "headerLogged" &&
          token !== "no-token" &&
          token !== "" && <LoggedSection />}
        {headerType === "headerLoggedFull" &&
          token !== "no-token" &&
          token !== "" && <LoggedFullSection />}
        {headerType === "headerLoggedPartial" &&
          token !== "no-token" &&
          token !== "" && <LoggedPartialSection />}
        {(token === "no-token" || token === "") && <NotLoggedSection />}
        {headerType === "headerEmpty"}
        {/* {headerType === "headerPrivateProfile" && <PrivateProfileSection />} */}
        {/* {headerType === "headerNotifications" && <NotificationsSection />} */}
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

          <div className="relative flex">
            <div
              className="mt-1"
              hidden={
                token === "no-token" ||
                token === "" ||
                headerType === "headerEmpty"
              }
            >
              <NotificationsDropdown />
            </div>

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              className={`hamburger block mr-2 z-10 relative focus:outline-none ${
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
                {headerType === "headerLogged" &&
                  token !== "no-token" &&
                  token !== "" && <LoggedSectionMobile />}
                {headerType === "headerLoggedFull" &&
                  token !== "no-token" &&
                  token !== "" && <LoggedFullSectionMobile />}
                {headerType === "headerLoggedPartial" &&
                  token !== "no-token" &&
                  token !== "" && <LoggedPartialSectionMobile />}
                {headerType === "headerEmpty"}
                {(token === "no-token" || token === "") && (
                  <NotLoggedSectionMobile />
                )}
                {/* {headerType === "headerPrivateProfile" && (
                  <PrivateProfileSectionMobile />
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
