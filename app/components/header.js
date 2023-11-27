import Link from "next/link";

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
      <div className="mr-7 font-medium text-xl">N</div>
      <Link
        href="/profile"
        className="font-medium text-l bg-blue-600 rounded-full pr-8"
      ></Link>
    </div>
  );
}

// Categories, searchbar, create auction, notifications, profile icon
function LoggedFullSection() {
  return (
    <>
      <div>Categories</div>
      <div>Search</div>
      <div className="mr-8 flex justify-between">
        <div className="mr-7 font-medium text-xl">N</div>
        <Link
          href="/profile"
          className="font-medium text-l bg-blue-600 rounded-full pr-8"
        ></Link>
      </div>
    </>
  );
}

function OnlyNotificationsSection() {
  return <div className="mr-8 font-medium text-xl">N</div>;
}

function NotLoggedSection() {
  return <div className="mr-6 font-medium text-xl">Log In</div>;
}

// Modify profile icon and notifications
function ModifyProfileSection() {
  return (
    <div className="mr-8 flex justify-between">
      <div className="mr-7 font-medium text-xl">M</div>
      <div className="font-medium text-xl">N</div>
    </div>
  );
}

export default function Header({ headerType }) {
  return (
    <div className="sticky top-0 border-b">
      <div className="m-3 flex justify-between">
        <Logo />

        {headerType === "headerLoggedFull" && <LoggedFullSection />}
        {headerType === "headerLoggedPartial" && <LoggedPartialSection />}
        {headerType === "headerNotifications" && <OnlyNotificationsSection />}
        {headerType === "headerNotLogged" && <NotLoggedSection />}
        {headerType === "headerModifyProfile" && <ModifyProfileSection />}
        {headerType === "headerEmpty"}
      </div>
    </div>
  );
}
