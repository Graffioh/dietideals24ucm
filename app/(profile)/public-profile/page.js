import Header from "../../components/header.js";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ProfilePage() {
  return (
    <>
      <div className="flex mt-20 ml-[15em] mr-[15em]">
        <div className="mt-10 mr-10">
          <Button className="w-20 h-20">C</Button>
        </div>
        <div className="flex-col w-full">
          <h1 className="font-bold text-5xl mb-4">USERNAME</h1>
          <Textarea className="" placeholder="BIO HERE" />
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-stone-200 flex mt-10 mb-20 relative rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
          <div className="flex flex-col absolute ml-5 mt-5">
          <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          </div>
            
          <div className="mr-10 ml-10 mb-10">
            <input
              className="flex ml-auto mt-3 border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="mammt"
            ></input>
            <div className="grid grid-rows-2 md:grid-flow-col gap-5 p-7">
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
              <h1 className="bg-stone-300 text-white p-20">PORNO</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
