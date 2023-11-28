"use client";

import * as React from "react";
import githubIcon from '../../images/github-logo.svg'
import googleIcon from '../../images/google-logo.svg'
import facebookIcon from '../../images/facebook-logo.svg'

import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <form onSubmit={onSubmit}>
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
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            Log In
          </Button>
        </div>
      </form>
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
      <Button variant="outline" type="button" disabled={isLoading}>
        <Image
        src={githubIcon}
        alt="My SVG"
        width={23}
        height={23}
        className="mr-2"
      />
        Github
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
        <Image
        src={googleIcon}
        alt="My SVG"
        width={21}
        height={21}
        className="mr-2"
      />
        Google
      </Button>
      <Button variant="outline" type="button" disabled={isLoading}>
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
