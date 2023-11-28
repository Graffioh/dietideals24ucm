"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  return (
    <>
    <div className="flex flex-col items-center h-auto">
      <div className="text-3xl">
        Profilo
      </div>
{/*       
      
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input> */}

      <div className="w-full max-w-sm items-center gap-4">

        <Label>Name*</Label>
        <Input type="name" id="name" placeholder="Name"/>

        <Label>Surname*</Label>
        <Input type="surname" id="surname" placeholder="Surname"/>

        <Label>Date of birth*</Label>
        <Input type="dateofbirth" id="dateofbirth" placeholder="Date"/>

        <Label>Username*</Label>
        <Input type="username" id="username" placeholder="Userame"/>

        <Label>Mail*</Label>
        <Input type="mail" id="mail" placeholder="Mail" />

        <Label>Password*</Label>
        <Input type="password" id="password" placeholder="Password" />

        <Label>Phone Number</Label>
        <Input type="phoneNumber" id="phoneNumber" placeholder="Phone Number"/>

        <Label>Bio</Label>
        <Input type="bio" id="bio" placeholder="Bio"/>

        <Label>Website</Label>
        <Input type="website" id="website" placeholder="Website"/>
  
       </div>

        {/* <div className="flex">
          <div className="mx-2">
            <button className="border-2 border-black">Cancel</button>
          </div>
          <div className="mx-2">
            <button className="border-2 border-black">Save</button>
          </div>
        </div> */}

  </div>

    </>
  );
}
  
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
        

      <button className="border-2 border-black">Cancel</button>
      <button className="border-2 border-black">Save</button>
    </div>
    </>
  );
}
