"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { hash } from "bcryptjs";
import { InfoCircledIcon } from "@radix-ui/react-icons";

import useSWR from "swr";

import { useCookies } from "next-client-cookies";
import DatePicker from "@/app/components/datePicker";

export default function ProfilePage({ searchParams }) {
  const [profileStatus, setProfileStatus] = useState("");
  const [birthDate, setBirthDate] = useState("");

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
      // birthDate: inputs.birthDate.value,
      birthDate: birthDate,
      email: inputs.email.value,
      piva: inputs.piva ? inputs.piva.value : "",
      telephoneNumber: inputs.telephoneNumber
        ? inputs.telephoneNumber.value
        : "",
      biography: inputs.biography ? inputs.biography.value : "",
      website: inputs.website ? inputs.website.value : "",
    };

    const tokenResponse = await fetch("http://localhost:8080/get-login-token", {
      method: "GET",
      credentials: "include",
    });
    const token = await tokenResponse.text();

    token.replaceAll('"', "");

    if (token != "no-token") {
      const currentSubjectResponse = await fetch(
        "http://localhost:8080/get-subject-from-token",
        { method: "POST", body: token }
      );

      const currentSubject = await currentSubjectResponse.text();

      const currentUserResponse = currentSubject.includes("@")
        ? await fetch(
            "http://localhost:8080/user-from-email?email=" + currentSubject
          )
        : await fetch(
            "http://localhost:8080/user-from-username?username=" +
              currentSubject
          );

      const currentUser = await currentUserResponse.json();

      // UPDATE
      const fff = await fetch(
        "http://localhost:8080/update-profile?id=" + currentUser.id,
        {
          method: "PUT",
          body: JSON.stringify(userInfoFromInputs),
          headers: { "Content-Type": "application/json" },
        }
      );

      setProfileStatus("Account updated successfully.");
    } else {
      // POST
      await createUserAccount(userInfoFromInputs);

      window.location.href = "/";
    }
  }

  // GET INFO FROM CURRENT LOGGED USER
  // *******************
  const token = useCookies().get("token");

  let currentUser = null;

  if (token) {
    const userInfoFetcher = (url) =>
      fetch(url, { method: "POST", credentials: "include", body: token }).then(
        (res) => res.text()
      );

    const {
      data: subject,
      error: subjectError,
      isLoading: subjectIsLoading,
    } = useSWR("http://localhost:8080/get-subject-from-token", userInfoFetcher);

    const fetcher = (url) =>
      fetch(url, { next: { revalidate: 3 } }).then((res) => res.json());

    const {
      data: currentUserData,
      error: currentUserError,
      isLoading: currentUserIsLoading,
    } = useSWR(
      subject != null && subject.includes("@")
        ? "http://localhost:8080/user-from-email?email=" + subject
        : "http://localhost:8080/user-from-username?username=" + subject,
      fetcher
    );

    currentUser = currentUserData;

    if (currentUserIsLoading) return <div>Loading...</div>;
  }

  // *******************

  function isUserAdult(birthDateString) {
    // Assumendo che birthDateString sia nel formato 'YYYY-MM-DD'
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
                readOnly={currentUser ? true : false}
              />
            </div>

            <div>
              <Label className="flex mb-2">
                Date of birth (YYYY-MM-dd)<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="text"
                id="birthDate"
                placeholder="Date"
                defaultValue={
                  currentUser ? currentUser.birthDate.split("T")[0] : ""
                }
                required
              />
              {/* <DatePicker handleBirthDate={handleBirthDate} currentUserBirthDate={currentUser ? "2000-10-10" : "2001-09-11"}/> */}
            </div>

            {currentUser &&
            isUserAdult(currentUser.birthDate.split("T")[0].slice(0, 4)) ? (
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
            <div className="mx-5 mb-10">
              <Button className="mr-6 mt-6">Cancel</Button>
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
