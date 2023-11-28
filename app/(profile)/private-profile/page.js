"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  return (
    <>
    <div className="flex flex-col items-center h-auto">
      <div className="text-3xl">
        Profilo
      </div>

      <div className="w-64 max-w-sm items-center grid gap-6">
        
      <div>
        <Label className="flex">Name<div className="text-red-500">*</div></Label>
        <Input type="name" id="name" placeholder="Name"/>
      </div> 
  
      <div>
        <Label className="flex">Surname<div className="text-red-500">*</div></Label>
        <Input type="surname" id="surname" placeholder="Surname"/>
      </div>

      <div>
        <Label className="flex">Date of birth<div className="text-red-500">*</div></Label>
        <Input type="dateofbirth" id="dateofbirth" placeholder="Date"/>
      </div>

      <div>
        <Label className="flex">Username<div className="text-red-500">*</div></Label>
        <Input type="username" id="username" placeholder="Userame"/>

      </div>

       <div> 
        <Label className="flex">Mail<div className="text-red-500">*</div></Label>
        <Input type="mail" id="mail" placeholder="Mail" />
      </div>

      <div>
        <Label className="flex">Password<div className="text-red-500">*</div></Label>
        <Input type="password" id="password" placeholder="Password" />
      </div>

      <div>
        <Label>Phone Number</Label>
        <Input type="phoneNumber" id="phoneNumber" placeholder="Phone Number"/>
      </div>

      <div>
        <Label>Bio</Label>
        <Input type="bio" id="bio" placeholder="Bio"/>
      </div>

      <div>
        <Label>Website</Label>
        <Input type="website" id="website" placeholder="Website"/>
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
