import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import getCurrentUserServer from "@/app/(auth)/getCurrentUserServer";
import AuctionsContainerPublicProfile from "@/app/components/auctionsContainerPublicProfile";
import ShowMoreDetailsPublicProfile from "@/app/components/showMoreDetailsPublicProfile";

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

  // if searchParams is not present or if searchParams.id == currentUser.id,
  //   then display currentUser, otherwise display the queried user by id
  const publicProfileUser = searchParams.id
    ? currentUser
      ? currentUser.id !== searchParams.id
        ? await getUserById(searchParams.id)
        : currentUser
      : {}
    : currentUser;

  return (
    <>
      <div className="flex md:flex-row flex-col mt-16 md:ml-[15em] md:mr-[15em] items-center">
        {/* <div className="mt-2 md:mr-10">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
            <AvatarFallback />
          </Avatar>
        </div> */}
        <div className="md:flex-col md:w-full mt-1 md:mt-0">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="flex">
              <div className="mt-2 mr-4 md:mr-10">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@avatar"
                  />
                  <AvatarFallback />
                </Avatar>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <h1 className="font-bold text-4xl md:text-5xl">
                    {publicProfileUser ? publicProfileUser.username : "none"}
                  </h1>

                  {publicProfileUser.id === currentUser.id ? (
                    <Link href="/private-profile?type=update">
                      <Button variant="ghost" className="md:mt-1.5 mt-1">
                        <Pencil1Icon width="23" height="23" />
                      </Button>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>

                <ShowMoreDetailsPublicProfile
                  publicProfileUser={publicProfileUser}
                />
              </div>
            </div>
          </div>
          <Textarea
            className="resize-none mt-4"
            placeholder=""
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
