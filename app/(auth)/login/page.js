import Link from "next/link";
import { UserAuthForm } from "../../components/userAuthForm";

export default function LoginPage() {
  return (
    <>
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-medium">Log into your account</h1>
        <p className="text-sm text-slate-500 mb-4">
          Enter your email and password below to login
        </p>
        <UserAuthForm className="w-80 min-w-screen" createOrLogin={"Log In"} />
        <div className="flex">
          <p className="text-xs text-slate-500 mt-2">
            If you don&apos;t have an account yet,
          </p>
          <Link href="/create-account" className="font-bold text-xs mt-2 ml-1">
            create a new one here.
          </Link>
        </div>
      </div>
    </>
  );
}
