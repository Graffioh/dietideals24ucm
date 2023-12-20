"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { hash } from "bcryptjs";

export default function ProfilePage({ searchParams }) {
  async function createUserAccount(user) {
    console.log("og user: ", user);

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
      }
        
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWithHashedPassword),
      });
    } catch (e) {
      console.log({ e });
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    const inputs = event.currentTarget;
    const userInfoFromInputs = {
      id: 999,
      firstName: inputs.firstName.value,
      lastName: inputs.lastName.value,
      username: inputs.username.value,
      password: inputs.password.value,
      birthDate: inputs.birthDate.value,
      email: inputs.mail.value,
    };

    // distinguish between POST and UPDATE
    // UPDATE = 
    //  1) fetch all users and check if the username in the input field is already in the database
    //  1.1) check if username in input field == username of the current logged account
    // else POST

    // UPDATE

    // POST
    await createUserAccount(userInfoFromInputs);

    console.log("form submitted");
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
              />
            </div>

            <div>
              <Label className="flex mb-2">
                Username<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>

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
              />
            </div>

            <div>
              <Label className="flex mb-2">
                Password<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="password"
                id="password"
                placeholder="Password"
                value={searchParams.password}
              />
            </div>

            <div>
              <Label className="flex mb-2">
                Date of birth<div className="text-red-500">*</div>
              </Label>
              <Input
                className="h-9 bg-white"
                type="text"
                id="birthDate"
                placeholder="Date"
              />
            </div>

            <div>
              <Label className="flex mb-2">Phone Number</Label>
              <Input
                className="h-9 bg-white"
                type="tel"
                id="phoneNumber"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <Label className="flex mb-2">Bio</Label>
              <Textarea
                className="bg-white"
                placeholder="Type your description here."
                id="biography"
              />
            </div>

            <div>
              <Label className="flex mb-2">Website</Label>
              <Input
                className="h-9 bg-white"
                type="url"
                id="website"
                placeholder="Website"
              />
            </div>
          </div>

          <div className="flex">
            <div className="mx-5 mb-10">
              <Button className="mr-6 mt-6">Cancel</Button>
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
