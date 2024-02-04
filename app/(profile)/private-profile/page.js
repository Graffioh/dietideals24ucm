"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { hash } from "bcryptjs";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import DatePicker from "@/app/components/datePicker";

import CancelAlertDialog from "@/app/components/cancelAlertDialog";
import { useUserContext } from "@/app/(auth)/userProvider";

export default function ProfilePage({ searchParams }) {
  const [profileStatus, setProfileStatus] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const { currentUser, currentUserIsLoading } = useUserContext();

  async function createUserAccount(user) {
    try {
      const hashedPassword = await hash(user.password, 10);

      const userWithHashedPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: hashedPassword,
        birthDate: user.birthDate,
        email: user.email,
      };

      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWithHashedPassword),
      });

      const responseToken = await fetch(
        "http://localhost:8080/generate-login-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userWithHashedPassword),
        }
      );

      const responseTokenText = await responseToken.text();

      const responseCookie = await fetch(
        "http://localhost:8080/set-login-token",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseTokenText),
        }
      );

      setProfileStatus("Account created successfully.");
    } catch (e) {
      setProfileStatus("Error while creating account");
      console.log({ e });
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    const inputs = event.currentTarget;
    const userInfoFromInputs = {
      id: Date.now(),
      firstName: inputs.firstName.value,
      lastName: inputs.lastName.value,
      username: inputs.username.value,
      password: inputs.password.value,
      // birthDate: currentUser ? currentUser.birthDate : birthDate,
      birthDate: birthDate,
      email: inputs.email.value,
      piva: inputs.piva ? inputs.piva.value : "",
      telephoneNumber: inputs.telephoneNumber
        ? inputs.telephoneNumber.value
        : "",
      biography: inputs.biography ? inputs.biography.value : "",
      website: inputs.website ? inputs.website.value : "",
    };

    if (currentUser && currentUser.id) {
      console.log("UPDATE");
      // UPDATE
      await fetch("http://localhost:8080/update-profile?id=" + currentUser.id, {
        method: "PUT",
        body: JSON.stringify(userInfoFromInputs),
        headers: { "Content-Type": "application/json" },
      });

      setProfileStatus("Account updated successfully.");
    } else {
      console.log("POST");
      // POST
      await createUserAccount(userInfoFromInputs);

      window.location.href = "/home";
    }
  }

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

  function handleBirthDate(date) {
    setBirthDate(date);
  }

  if (currentUserIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex justify-center mb-10 mt-10">
        <Avatar className="h-32 w-32">
          <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
          <AvatarFallback>gojo</AvatarFallback>
        </Avatar>
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center">
          <div className="w-64 items-center grid gap-6">
            <div>
              <Label className="flex mb-2">
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
              <Label className="flex mb-2">
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

            {searchParams.fromProvider === "github" ? (
              <>
                <div>
                  <Label className="flex mb-2">
                    Username<div className="text-red-500">*</div>
                  </Label>
                  <Input
                    className="h-9 bg-white"
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={searchParams.username}
                    required
                    readOnly
                  />
                </div>
              </>
            ) : (
              <div>
                <Label className="flex mb-2">
                  Username<div className="text-red-500">*</div>
                </Label>
                <Input
                  className="h-9 bg-white"
                  type="text"
                  id="username"
                  placeholder="Username"
                  defaultValue={currentUser ? currentUser.username : ""}
                  required
                />
              </div>
            )}

            {searchParams.fromProvider === "google" ? (
              <>
                <div>
                  <Label className="flex mb-2">
                    Email<div className="text-red-500">*</div>
                  </Label>
                  <Input
                    className="h-9 bg-white"
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={searchParams.email}
                    required
                    readOnly
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label className="flex mb-2">
                    Email<div className="text-red-500">*</div>
                  </Label>
                  <Input
                    className="h-9 bg-white"
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={
                      currentUser ? currentUser.email : searchParams.email
                    }
                    required
                    readOnly={currentUser ? true : false}
                  />
                </div>
              </>
            )}

            <div>
              <Label className="flex mb-2">
                Password<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="password"
                id="password"
                placeholder="Password"
                defaultValue={currentUser ? currentUser.password : ""}
                required
                readOnly={currentUser.id ? true : false}
              />
            </div>

            <div>
              <Label className="flex mb-2">
                Date of birth (YYYY-MM-dd)<div className="text-red-500">*</div>
              </Label>
              {/* <Input
                className="h-9 bg-white"
                type="text"
                id="birthDate"
                placeholder="Date"
                defaultValue={
                  currentUser ? currentUser.birthDate.split("T")[0] : ""
                }
                required
              /> */}
              <DatePicker
                handleParentDate={handleBirthDate}
                defaultDate={currentUser ? new Date(currentUser.birthDate) : ""}
                isBirthDate={true}
              />
            </div>

            {currentUser &&
            isUserAdult(
              currentUser.birthDate
                ? currentUser.birthDate.split("T")[0].slice(0, 4)
                : new Date()
            ) ? (
              <div className="flex">
                <div className="flex-col grow">
                  <Label>P.IVA</Label>
                  <Input
                    className="h-9 bg-white flex grow"
                    type="text"
                    id="piva"
                    placeholder="P.IVA"
                    defaultValue={currentUser ? currentUser.piva : ""}
                  />
                </div>
                <InfoCircledIcon className="mt-8 ml-2" width={18} height={18} />
              </div>
            ) : (
              <div></div>
            )}

            {currentUser ? (
              <>
                <div>
                  <Label className="flex mb-2">Phone Number</Label>
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
                  <Label className="flex mb-2">Bio</Label>
                  <Textarea
                    className="bg-white"
                    placeholder="Type your description here."
                    id="biography"
                    defaultValue={currentUser ? currentUser.biography : ""}
                  />
                </div>

                <div>
                  <Label className="flex mb-2">Website</Label>
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
          <div>{profileStatus}</div>
        </div>
      </form>
    </>
  );
}
