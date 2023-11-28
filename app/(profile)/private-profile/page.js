import Header from "../../components/header.js";

export default function ProfilePage() {
  return (
    <>
    <div className="flex flex-col items-center h-auto">
      <div className="text-3xl flex justify-center">
        Profilo
      </div>

      <div className="text-xxs">
          Name*
      </div>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>
        <input className="ml-6 mb-6 mt-3 flex justify-center w64 max-w-min border-2 border-black"></input>

      <button className="border-2 border-black">Cancel</button>
      <button className="border-2 border-black">Save</button>
    </div>
    </>
  );
}
