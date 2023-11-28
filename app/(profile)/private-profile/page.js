import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  return (
    <>
    <div className="flex flex-col items-center h-auto">
      <div className="text-3xl">
        Profilo
      </div>
      
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
        <Input className="w-auto h-8 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></Input>
  
    {/* <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div> */}
        

      <button className="border-2 border-black">Cancel</button>
      <button className="border-2 border-black">Save</button>
    </div>
    </>
  );
}
