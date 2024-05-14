"use client";

import { Label } from "@/components/shadcn-ui/label";
import { Input } from "@/components/shadcn-ui/input";
import { toast } from "sonner";
import { Button } from "@/components/shadcn-ui/button";
import { hash } from "bcryptjs";
import config from "@/config";

export default function ResetPasswordPage({ searchParams }) {
  async function onSubmit(event) {
    event.preventDefault();

    const newPassword = event.target.elements.password.value;
    const passwordCheck = event.target.elements.password_check.value;

    if (newPassword === passwordCheck) {
      const idResponse = await fetch(
        config.apiUrl + "/users/get-id/" + searchParams.email,
        {
          method: "GET",
        }
      );

      const idFromEmail = await idResponse.text();

      const hashedPassword = await hash(newPassword, 10);

      try {
        await fetch(config.apiUrl + "/users/change-password/" + idFromEmail, {
          method: "PUT",
          body: hashedPassword,
        });
      } catch (e) {
        console.error("Error in /change-password: " + e);
      }

      toast.success("Password changed.");

      setTimeout(() => {
        window.location.href = "/home";
      }, 700);
    } else {
      toast.error("Password not matching!");
      return;
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col justify-center items-center mt-3">
        <div>
          <Label className="mb-2 flex">
            New password<div className="text-red-500">*</div>
          </Label>
          <div className="flex w-72">
            <Input
              className="h-9 bg-white"
              type="password"
              id="password"
              placeholder="New password"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Label className="mb-2 flex">
            Retype new password<div className="text-red-500">*</div>
          </Label>
          <div className="flex w-72">
            <Input
              className="h-9 bg-white"
              type="password"
              id="password_check"
              placeholder="New password"
              required
            />
          </div>
        </div>
        <Button className="mt-4">Save</Button>
      </div>
    </form>
  );
}
