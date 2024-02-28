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

  async function getAuctionsByUserId(userId) {
    try {
      const auctionsRes = await fetch(
        process.env.NEXT_PUBLIC_BASEURL + "/auctions/user/" + userId
      );

      const auctions = await auctionsRes.json();

      return auctions;
    } catch (e) {
      console.error("Error while fetching auctions by user id: " + e);
    }
  }

  // if searchParams is not present or if searchParams.id == currentUser.id,
  //   then display currentUser, otherwise display the queried user by id
  const publicProfileUser = searchParams.id
    ? currentUser
      ? currentUser.id !== searchParams.id
        ? await getUserById(searchParams.id)
        : currentUser
      : {}
    : currentUser;

  const auctionsFromUser = await getAuctionsByUserId(
    searchParams.id ? searchParams.id : currentUser.id
  );
  
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
                <Button variant="ghost" className="mt-1.5 md:mt-0 md:mb-3 md:ml-0.5">
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

      <div className="flex flex-col bg-stone-200 mt-10 mb-20 md:mx-32 mx-4 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
        <div className="mt-6 ml-11">
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Selling</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Buying</Label>
            </div>
          </RadioGroup>
        </div>

        {/* <input
              className="flex ml-auto mt-4 border-2 border-gray-300 px-5 py-1.5 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search..."
            ></input> */}
        <div className="flex ml-auto mt-4 px-5 py-1.5 rounded-md focus:outline-none focus:border-blue-500">
          {" "}
        </div>

        <div className="grid md:overflow-hidden overflow-x-auto md:grid-rows-2 md:grid-cols-4 grid-flow-col md:gap-10 gap-5 md:mx-12 mx-4">
          {auctionsFromUser.map((auction) => (
            <Link
              href={
                "/auction-details?id=" +
                auction.id +
                "&auctionuserid=" +
                auction.idUserAccount
              }
              key={auction.id}
              className="w-64"
            >
              <CardAuction
                key={auction.id}
                isHomepage={false}
                auction={auction}
              />
            </Link>
          ))}
        </div>
        <div className="my-5 flex justify-center items-center">
          <AuctionPagination />
        </div>
      </div>
    </>
  );
}
