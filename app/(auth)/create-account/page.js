import Link from "next/link";
import { UserAuthForm } from "../../components/userAuthForm";

export default function CreateAccountPage() {
  return (
    <>
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-medium">Create an account</h1>
        <p className="text-sm text-slate-500 mb-4">
          Enter your email and password below to create your account
        </p>
        <UserAuthForm className="w-80 min-w-screen" createOrLogin="Create account" />
      </div>
    </>
  );
}
