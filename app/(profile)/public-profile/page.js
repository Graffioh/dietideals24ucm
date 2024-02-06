import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import AuctionPagination from "../../components/auctionPagination";
import getCurrentUserServer from "@/app/(auth)/getCurrentUserServer";
import CardAuctionEmpty from "@/app/components/cardAuctionEmpty";

export default async function ProfilePage({ searchParams }) {
  const currentUser = await getCurrentUserServer();

  async function getUserById(id) {
    const userFromRes = await fetch(
      "http://localhost:8080/user-from-id?id=" + id
    );

    const user = await userFromRes.json();

    return user;
  }

  // if searchParams is not present or if searchParams.id == currentUser.id,
  //   then display currentUser, otherwise display the queried user by id
  const publicProfileUser = searchParams.id
    ? currentUser.id !== searchParams.id
      ? await getUserById(searchParams.id)
      : currentUser
    : currentUser;

  return (
    <>
      <div className="flex mt-16 ml-[15em] mr-[15em]">
        <div className="mt-2 mr-10">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
            <AvatarFallback>gojo</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-col w-full">
          <div className="flex">
            <h1 className="font-bold text-5xl mb-4">
              {publicProfileUser ? publicProfileUser.username : "none"}
            </h1>
            {publicProfileUser.id === currentUser.id ? (
              <Link href="/private-profile?type=update">
                <Button variant="ghost" className="mt-1.5 ml-2">
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

      <div className="flex justify-center">
        <div className="bg-stone-200 flex flex-col mt-10 mb-20 relative rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
          <div className="flex flex-col absolute ml-8 mt-7">
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

          <div className="mr-10 ml-10 mb-10">
            {/* <input
              className="flex ml-auto mt-4 border-2 border-gray-300 px-5 py-1.5 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search..."
            ></input> */}
            <div className="flex ml-auto mt-4 px-5 py-1.5 rounded-md focus:outline-none focus:border-blue-500">
              {" "}
            </div>

            <div className="grid grid-rows-2 md:grid-flow-col gap-5 px-7 pt-7 mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                <CardAuctionEmpty key={number} isHomepage={false} />
              ))}
            </div>
          </div>
          <div className="mb-5 flex justify-center items-center">
            <AuctionPagination />
          </div>
        </div>
      </div>
    </>
  );
}
