"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { hash } from "bcryptjs";
import { toast } from "sonner";

import DatePicker from "@/app/components/datePicker";

import CancelAlertDialog from "@/app/components/cancelAlertDialog";
import { useUserContext } from "@/app/providers/userProvider";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function ProfilePage({ searchParams }) {
  const [birthDate, setBirthDate] = useState("");
  const { currentUser, currentUserIsLoading } = useUserContext();

  const provider = currentUser ? currentUser.provider : null;

  async function createUserAccount(user) {
    try {
      const hashedPassword = await hash(user.password, 10);

      const userWithHashedPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: hashedPassword,
        birthDate: user.birthDate ? user.birthDate : new Date(),
        email: user.email,
        provider: searchParams.fromProvider,
      };

      try {
        await fetch(process.env.NEXT_PUBLIC_BASEURL + "/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userWithHashedPassword),
        });
      } catch (e) {
        console.error("Error in /register: " + e);
      }

      try {
        const responseToken = await fetch(
          process.env.NEXT_PUBLIC_BASEURL + "/generate-login-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userWithHashedPassword),
          }
        );

        const responseTokenText = await responseToken.text();

        await fetch(process.env.NEXT_PUBLIC_BASEURL + "/set-login-token", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseTokenText),
        });
      } catch (e) {
        console.error("Error while generating/setting the auth token: " + e);
      }
    } catch (e) {
      toast.error("Error while creating the account!", {
        position: "bottom-center",
      });

      console.error("Error while creating the account: " + e);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    const inputs = event.currentTarget;

    // Haha bullsh*t
    const birthDateForInputs =
      currentUser && currentUser.birthDate
        ? currentUser.birthDate
        : birthDate ?? new Date();

    const userInfoFromInputs = {
      id: Date.now(),
      firstName: inputs.firstName.value,
      lastName: inputs.lastName.value,
      username: inputs.username.value,
      password: inputs.password.value,
      birthDate: birthDateForInputs,
      email: inputs.email.value,
      telephoneNumber: inputs.telephoneNumber
        ? inputs.telephoneNumber.value
        : "",
      biography: inputs.biography ? inputs.biography.value : "",
      website: inputs.website ? inputs.website.value : "",
    };

    if (currentUser && currentUser.id) {
      await fetch(
        process.env.NEXT_PUBLIC_BASEURL +
          "/users/update-profile/" +
          currentUser.id,
        {
          method: "PUT",
          body: JSON.stringify(userInfoFromInputs),
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Account updated successfully.", {
        position: "bottom-center",
      });
    } else {
      await createUserAccount(userInfoFromInputs);

      window.location.href = "/home";

      toast.success("Account created successfully.", {
        position: "bottom-center",
      });
    }
  }

  function handleBirthDate(date) {
    setBirthDate(date);
  }

  if (currentUserIsLoading && !searchParams.fromProvider) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 mt-10 flex justify-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
          <AvatarFallback />
        </Avatar>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center">
          <div className="grid w-64 items-center gap-6">
            <div>
              <Label className="mb-2 flex">
                Name<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="text"
                id="firstName"
                placeholder="Name"
                defaultValue={currentUser ? currentUser.firstName : ""}
                required
              />
            </div>

            <div>
              <Label className="mb-2 flex">
                Surname<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="text"
                id="lastName"
                placeholder="Surname"
                defaultValue={currentUser ? currentUser.lastName : ""}
                required
              />
            </div>

            <div>
              <Label className="mb-2 flex">
                Username<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="text"
                id="username"
                placeholder="Username"
                defaultValue={
                  searchParams.fromProvider === "github"
                    ? searchParams.username
                    : currentUser
                    ? currentUser.username
                    : ""
                }
                required
                readOnly={
                  searchParams.fromProvider === "github" ||
                  provider === "github"
                    ? true
                    : false
                }
              />
            </div>

            <div>
              <Label className="mb-2 flex">
                Email<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="email"
                id="email"
                placeholder="Email"
                defaultValue={
                  searchParams.fromProvider === "google"
                    ? searchParams.email
                    : currentUser
                    ? currentUser.email
                    : searchParams.email
                }
                required
                readOnly={
                  searchParams.fromProvider === "google" ||
                  provider === "google"
                    ? true
                    : false
                }
              />
            </div>

            <div>
              <Label className="mb-2 flex">
                Password<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="password"
                id="password"
                placeholder="Password"
                defaultValue={currentUser ? currentUser.password : ""}
                required
                readOnly={currentUser ? (currentUser.id ? true : false) : false}
              />
            </div>

            <div>
              <Label className="mb-2 flex">
                Date of birth (YYYY-MM-dd)<div className="text-red-500">*</div>
              </Label>
              <DatePicker
                handleParentDate={handleBirthDate}
                defaultDate={
                  currentUser ? new Date(currentUser.birthDate) : new Date()
                }
                isBirthDate={true}
                isReadOnly={
                  currentUser ? (currentUser.id ? true : false) : false
                }
              />
            </div>

            {currentUser ? (
              currentUser.id ? (
                <>
                  <div>
                    <Label className="mb-2 flex">Phone Number</Label>
                    <Input
                      className="h-9 bg-white"
                      type="tel"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      defaultValue={
                        currentUser ? currentUser.telephoneNumber : ""
                      }
                    />
                  </div>

                  <div>
                    <Label className="mb-2 flex">Bio</Label>
                    <Textarea
                      className="bg-white"
                      placeholder="Type your description here."
                      id="biography"
                      defaultValue={currentUser ? currentUser.biography : ""}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 flex">Website</Label>
                    <Input
                      className="h-9 bg-white"
                      type="url"
                      id="website"
                      placeholder="Website"
                      defaultValue={currentUser ? currentUser.website : ""}
                    />
                  </div>
                </>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}
          </div>

          <div className="flex">
            <div className="mx-5 mb-10 mt-6">
              <CancelAlertDialog />
            </div>
            <div className="mx-2">
              <Button className="mt-6">Save</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
