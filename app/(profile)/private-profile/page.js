"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function ProfilePage() {
  return (
    <>

   <div className = "flex flex justify-center mb-10 mt-10">
    <Avatar className = "h-32 w-32">
      <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
      <AvatarFallback>gojo</AvatarFallback>
    </Avatar>
    </div> 
  
    
    <div className="flex flex-col items-center">

      <div className="w-64 items-center grid gap-6">
        
      <div>
        <Label className="flex mb-2">Name<div className="text-red-500">*</div></Label>
        <Input className="h-8" type="name" id="name" placeholder="Name"/>
      </div> 
  
      <div>
        <Label className="flex mb-2">Surname<div className="text-red-500">*</div></Label>
        <Input className="h-8" type="surname" id="surname" placeholder="Surname"/>
      </div>


      <div>
        <Label className="flex mb-2">Username<div className="text-red-500">*</div></Label>
        <Input className="h-8" type="username" id="username" placeholder="Userame"/>

      </div>

       <div> 
        <Label className="flex mb-2">Mail<div className="text-red-500">*</div></Label>
        <Input className="h-8" type="mail" id="mail" placeholder="Mail" />
      </div>

      <div>
        <Label className="flex mb-2">Password<div className="text-red-500">*</div></Label>
        <Input className="h-8" type="password" id="password" placeholder="Password" />
      </div>

      <div>
        <Label className="flex mb-2">Date of birth<div className="text-red-500">*</div></Label>
        <Input className="h-8" type="dateofbirth" id="dateofbirth" placeholder="Date"/>
      </div>

      <div>
        <Label className="flex mb-2">Phone Number</Label>
        <Input className="h-8" type="phoneNumber" id="phoneNumber" placeholder="Phone Number"/>
      </div>

      <div>
        <Label className="flex mb-2">Bio</Label>
        <Input className="h-8" type="bio" id="bio" placeholder="Bio"/>
      </div>

      <div>
        <Label className="flex mb-2">Website</Label>
        <Input className="h-8" type="website" id="website" placeholder="Website"/>
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

    </>
  );
}
