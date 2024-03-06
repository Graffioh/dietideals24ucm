import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import AuctionPagination from "../../components/auctionPagination";
import getCurrentUserServer from "@/app/(auth)/getCurrentUserServer";
import CardAuction from "@/app/components/cardAuction";
import AuctionsContainerPublicProfile from "@/app/components/auctionsContainerPublicProfile";

export default async function ProfilePage({ searchParams }) {
  const currentUser = await getCurrentUserServer();

  async function getUserById(id) {
    try {
      const userRes = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/users/" + id,
        { next: { revalidate: 0 } }
      );

      const user = await userRes.json();

      return user;
    } catch (e) {
      console.error("Error while fetching user by id: " + e);
    }
  }

  // async function getAuctionsByUserId(userId) {
  //   try {
  //     const auctionsRes = await fetch(
  //       process.env.NEXT_PUBLIC_BASEURL + "/auctions/user/" + userId
  //     );

  //     const auctions = await auctionsRes.json();

  //     return auctions;
  //   } catch (e) {
  //     console.error("Error while fetching auctions by user id: " + e);
  //   }
  // }

  // if searchParams is not present or if searchParams.id == currentUser.id,
  //   then display currentUser, otherwise display the queried user by id
  const publicProfileUser = searchParams.id
    ? currentUser
      ? currentUser.id !== searchParams.id
        ? await getUserById(searchParams.id)
        : currentUser
      : {}
    : currentUser;

  // const auctionsFromUser = await getAuctionsByUserId(
  //   searchParams.id ? searchParams.id : currentUser.id
  // );

  return (
    <>
      <div className="flex md:flex-row flex-col mt-16 md:ml-[15em] md:mr-[15em] items-center">
        <div className="mt-2 md:mr-10">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
            <AvatarFallback />
          </Avatar>
        </div>
        <div className="md:flex-col md:w-full mt-1 md:mt-0">
          <div className="flex items-center mb-2 md:mb-0">
            <h1 className="font-bold text-xl md:text-5xl md:mb-4">
              {publicProfileUser ? publicProfileUser.username : "none"}
            </h1>
            {publicProfileUser.id === currentUser.id ? (
              <Link href="/private-profile?type=update">
                <Button
                  variant="ghost"
                  className="mt-1.5 md:mt-0.5 md:mb-3 md:ml-0.5"
                >
                  <Pencil1Icon width="23" height="23" />
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
          <Textarea
            className=""
            placeholder="BIO HERE"
            defaultValue={
              publicProfileUser ? publicProfileUser.biography : "none"
            }
            readOnly={true}
          />
        </div>
      </div>

      <AuctionsContainerPublicProfile
        publicProfileUserId={searchParams.id ?? currentUser.id}
      />
    </>
  );
}
