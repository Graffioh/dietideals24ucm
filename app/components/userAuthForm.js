"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import githubIcon from "../../images/github-logo.svg";
import googleIcon from "../../images/google-logo.svg";
import facebookIcon from "../../images/facebook-logo.svg";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compare } from "bcryptjs";

export function UserAuthForm({ className, createOrLogin }) {
  const router = useRouter();
  const [email, setEmail] = useState("test@test.com");
  const [error, setError] = useState("");

  // LOGIN
  // **************************
  async function onSubmitLogin(event) {
    event.preventDefault();
    const userInfoFromInputs = event.currentTarget;

    try {
      const userFromEmailResponse = await fetch(
        "http://localhost:8080/user?email=" + userInfoFromInputs.email.value
      );

      const userFromEmail = await userFromEmailResponse.json();

      const passwordCorrect = await compare(
        userInfoFromInputs.password.value,
        userFromEmail.password
      );

      if (passwordCorrect) {
        const responseToken = await fetch(
          "http://localhost:8080/generate-login-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userFromEmail),
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
          
        // router.push("/");
        window.location.href = "/";

        setError("");
      } else {
        setError("Error: invalid password, please try again.");
      }
    } catch (e) {
      console.log({ e });
      setError("Error: invalid email or password, please try again.");
    }
  }
  // **************************

  // REGISTRATION (redirection to private-profile)
  // **************************
  function handleRegisterEmailInputChange(event) {
    setEmail(event.target.value);
  }

  // When create account is clicked, pass the mail to private profile page
  async function pushEmailAsUrlParameter(event) {
    event.preventDefault();

    router.push(event.target.href + "?email=" + email);
  }
  // **************************

  return (
    <div className={cn("grid gap-4", className)}>
      {createOrLogin === "Log In" ? (
        <form onSubmit={onSubmitLogin}>
          <div className="grid gap-2">
            <div className="grid gap-3">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="bg-white"
              />
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                className="bg-white"
              />
            </div>
            <Button
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "default",
                  className: "h-9",
                })
              )}
            >
              {createOrLogin}
            </Button>
          </div>
        </form>
      ) : (
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="bg-white"
              onChange={handleRegisterEmailInputChange}
            />
          </div>
          <Link
            href="/private-profile"
            className={cn(
              buttonVariants({
                variant: "default",
                size: "default",
                className: "h-9",
              })
            )}
            onClick={pushEmailAsUrlParameter}
          >
            {createOrLogin}
          </Link>
        </div>
      )}
      <span className="text-red-500 text-sm">{error}</span>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="Github" type="button">
        <Image
          src={githubIcon}
          alt="My SVG"
          width={23}
          height={23}
          className="mr-2"
        />
        Github
      </Button>
      <Button variant="Google" type="button">
        <Image
          src={googleIcon}
          alt="My SVG"
          width={21}
          height={21}
          className="mr-2"
        />
        Google
      </Button>
      <Button variant="Facebook" type="button">
        <div className="flex ml-3">
          <Image
            src={facebookIcon}
            alt="My SVG"
            width={23}
            height={23}
            className="mr-2"
          />
          Facebook
        </div>
      </Button>
    </div>
  );
}
