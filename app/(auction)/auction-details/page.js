import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import DescendingAuctionDetailsInputs from "@/app/components/auctions/descendingAuctionDetailsInputs";
import EnglishAuctionDetailsInputs from "@/app/components/auctions/englishAuctionDetailsInputs";
import FixedTimeAuctionDetailsInputs from "@/app/components/auctions/fixedTimeAuctionDetailsInputs";
import PlaceOfferDialog from "@/app/components/placeOfferDialog";
import { cn } from "@/lib/utils";
import getCurrentUserServer from "@/app/(auth)/getCurrentUserServer";

export default async function AuctionDetailsPage({ searchParams }) {
  function getTokenFromCookie() {
    const nextCookies = cookies();

    const tokenCookieStr = nextCookies.has("auth-token")
      ? nextCookies.get("auth-token").value
      : '"no-token"';

    // return token without "..."
    return tokenCookieStr.replaceAll('"', "");
  }

  async function getCurrentAuctionBasedOnId(id) {
    try {
      const auctionResponse = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/auctions/" + id,
        {
          next: { revalidate: 3 },
        }
      );
      const auction = await auctionResponse.json();

      return auction;
    } catch (e) {
      console.error("Error while fetching auctions from id: " + e);
    }
  }

  const currentAuction = await getCurrentAuctionBasedOnId(searchParams.id);

  const authToken = getTokenFromCookie();

  const currentUser = await getCurrentUserServer();

  return (
    <>
      <div className="absolute ml-[10em] mt-14">
        <div className="flex flex-col">
          <Label className="flex text-2xl">{currentAuction.auctionName}</Label>
          <div className="">
            <img
              className="object-cover w-96 h-128 mt-5 rounded-lg flex items-center"
              src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-2xl mt-10 ml-auto mr-20">
        <div className="flex flex-col bg-stone-200 rounded-xl mb-60 ml-20 mr-20 shadow-[0px_4px_16px_rgba(17,17,26,0.2),_0px_8px_24px_rgba(17,17,26,0.2),_0px_16px_56px_rgba(17,17,26,0.2)]">
          {currentAuction.auctionType === "descending" && (
            <DescendingAuctionDetailsInputs currentAuction={currentAuction} />
          )}
          {currentAuction.auctionType === "english" && (
            <EnglishAuctionDetailsInputs currentAuction={currentAuction} />
          )}
          {currentAuction.auctionType === "fixedtime" && (
            <FixedTimeAuctionDetailsInputs currentAuction={currentAuction} />
          )}

          <div className="flex justify-center">
            <div className="font-bold text-5xl rounded-full mt-5 mb-[10em]">
              <Link href={"/public-profile?id=" + currentAuction.idUserAccount}>
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@avatar"
                  />
                  <AvatarFallback />
                </Avatar>
              </Link>
            </div>
            <div className="absolute mt-[20em]">
              <Label className="flex mb-2">Description</Label>
              <Textarea
                className="w-screen max-w-[30em] bg-white h-32"
                placeholder="Type your description here."
                defaultValue={currentAuction.auctionDescription}
                readOnly
              />
            </div>

            <div className="absolute mt-[32em]">
              {authToken === "no-token" ? (
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "default",
                      className: "p-7 text-lg",
                    })
                  )}
                  href="/login"
                >
                  Place offer
                </Link>
              ) : searchParams.auctionuserid != currentUser.id ? (
                <PlaceOfferDialog auction={currentAuction} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
