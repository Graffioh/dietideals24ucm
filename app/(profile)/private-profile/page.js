"use client";

import { useState, useRef } from "react";

import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import { Button } from "@/components/shadcn-ui/button";
import { hash } from "bcryptjs";
import { toast } from "sonner";
import { mutate } from "swr";

import { isValidPhoneNumber } from "react-phone-number-input";
import DatePicker from "@/components/dietideals24-ui/datePicker";

import CancelAlertDialog from "@/components/dietideals24-ui/cancelAlertDialog";
import { useUserContext } from "@/app/providers/userProvider";
import LoadingSpinner from "@/components/dietideals24-ui/loadingSpinner";
import config from "@/config";
import Compressor from "compressorjs";
import ProfilePic from "@/components/dietideals24-ui/profilePic";
import AdditionalPrivateProfileInfo from "@/components/dietideals24-ui/additionalPrivateProfileInfo";

export default function ProfilePage({ searchParams }) {
  const [birthDate, setBirthDate] = useState("");

  const { currentUser, currentUserIsLoading } = useUserContext();
  const [phone, setPhone] = useState(currentUser?.telephoneNumber ?? "");

  function handlePhoneChange(phone) {
    setPhone(phone);
  }

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
        profilePicUrl: user.profilePicUrl,
      };

      try {
        await fetch(config.apiUrl + "/users/register", {
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
          config.apiUrl + "/generate-login-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userWithHashedPassword),
          }
        );

        const responseTokenText = await responseToken.text();

        await fetch(config.apiUrl + "/set-login-token", {
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

  const [imageData, setImageData] = useState(null);

  function handleImageData(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleHiddenFileInput = () => {
    hiddenFileInput.current.click();
  };

  const handleImageUpload = async (userId) => {
    const compressedFile = await compressImage(file);

    const formData = new FormData();
    formData.append("file", compressedFile);

    if (compressedFile && compressedFile.size < 1500000) {
      try {
        const response = await fetch(
          config.apiUrl + "/users/upload-img?userId=" + userId,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const imageUrl = await response.text();
          console.log("Image uploaded successfully:", imageUrl);
          return imageUrl;
        } else {
          console.error("Error uploading image");
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  const compressImage = async (file) => {
    if (file) {
      return new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          success(compressedBlob) {
            const compressedFile = new File([compressedBlob], file.name, {
              type: file.type,
            });
            resolve(compressedFile);
          },
          error(error) {
            reject(error);
          },
        });
      });
    }
  };

  async function onSubmit(event) {
    event.preventDefault();

    const inputs = event.currentTarget;

    const newUserIdFromDate = Date.now();

    const pfpImageUrl =
      !file && currentUser
        ? currentUser.profilePicUrl
        : await handleImageUpload(currentUser?.id ?? newUserIdFromDate);

    const userInfoFromInputs = {
      id: newUserIdFromDate,
      firstName: inputs.firstName.value,
      lastName: inputs.lastName.value,
      username: inputs.username.value,
      password: inputs.password.value,
      birthDate: birthDate !== "" ? birthDate : currentUser?.birthDate,
      email: inputs.email.value,
      telephoneNumber: phone,
      biography: inputs.biography ? inputs.biography.value : "",
      website: inputs.website ? inputs.website.value : "",
      profilePicUrl: pfpImageUrl ?? "no-pfp",
    };

    if (file && file.size > 1500000) {
      toast.warning("Image size must be less than 1,5MB");
      return;
    }

    if (
      phone !== "" &&
      !isValidPhoneNumber(phone) &&
      currentUser &&
      currentUser.id
    ) {
      toast.warning("Phone number not valid, please choose a valid number.");
      return;
    }

    if (currentUser && currentUser.id) {
      await fetch(config.apiUrl + "/users/update-profile/" + currentUser.id, {
        method: "PUT",
        body: JSON.stringify(userInfoFromInputs),
        headers: { "Content-Type": "application/json" },
      });

      mutate("/users/image?key=" + currentUser.profilePicUrl);

      setTimeout(() => {
        window.location.href =
          config.apiUrl.replace("/api", "") + "/public-profile";
      }, 1000);

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
        <Button
          className="h-32 w-32 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            handleHiddenFileInput();
          }}
        >
          <ProfilePic
            picUrl={currentUser?.profilePicUrl}
            imageFromState={imageData}
          />
          <div className="absolute mt-24 ml-20 rounded-full bg-blue-950 px-[0.5em] py-[0.1em] text-white border-2 border-white">
            +
          </div>
        </Button>
        <Input
          onChange={(e) => {
            handleFileChange(e);
            handleImageData(e);
          }}
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
        />
      </div>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center">
          <div className="grid w-64 items-center gap-6">
            <div>
              <Label className="mb-2 flex">
                Name<div className="text-red-500">*</div>
              </Label>
              <div className="flex">
                <Input
                  className="h-9 bg-white"
                  type="text"
                  id="firstName"
                  placeholder="Name"
                  defaultValue={currentUser ? currentUser.firstName : ""}
                  pattern="^[a-zA-Z]+$"
                  title="Please enter only alphabetical characters for your name"
                  required
                />
              </div>
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
                pattern="^[a-zA-Z]+$"
                title="Please enter only alphabetical characters for your surname"
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
                pattern="^[a-zA-Z0-9\-_]+$"
                title="Please enter only alphanumerical characters, '-' and '_' for your username"
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
                defaultValue={searchParams.email ?? currentUser?.email}
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
                isReadOnly={false}
              />
            </div>

            <AdditionalPrivateProfileInfo
              currentUser={currentUser}
              phone={phone}
              onPhoneChange={handlePhoneChange}
            />
          </div>

          <div className="flex">
            {currentUser ? (
              <>
                <div className="mx-5 mb-10 mt-6">
                  <CancelAlertDialog />
                </div>
                <div className="mx-2">
                  <Button className="mt-6">Save</Button>
                </div>
              </>
            ) : (
              <div className="mx-2">
                <Button className="mb-4">Save</Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
