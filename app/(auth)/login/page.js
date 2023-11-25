import Link from "next/link";
import { UserAuthForm } from "../../components/userAuthForm";

export default function LoginPage() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-medium">Log into your account</h1>
        <p className="text-sm text-slate-500 mb-4">
          Enter your email and password below to login
        </p>
        <UserAuthForm className="w-80 min-w-screen" />
        <div className="flex">
        <p className="text-xs text-slate-500 mt-2">
          If you don't have an account yet,
        </p>
        <Link href="/" className="font-bold text-xs mt-2 ml-1">create a new one here.</Link>
        </div>
      </div>

      {/* <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-xl">Log into your account</h1>
        <p className="mb-4 text-xs">Enter your email and password below to login</p>
        <input className="w-64 min-w-screen m-1 border-2 border-grey-700"></input>
        <input className="w-64 min-w-screen m-1 border-2 border-grey-700"></input>
        <button className="w-64 min-w-screen m-2 border-2 border-blue-500">Log In</button>
        <p className="m-2 text-base">Or continue with</p>
        <button className="w-64 min-w-screen m-2 border-2 border-black">Github</button>
        <button className="w-64 min-w-screen m-2 border-2 border-red-500">Google</button>
        <button className="w-64 min-w-screen m-2 border-2 border-blue-500">Facebook</button>
        <p className="mt-2 text-xs">
          If you don't have an account yet, create a new one here.
        </p>
      </div> */}
    </>
  );
}
