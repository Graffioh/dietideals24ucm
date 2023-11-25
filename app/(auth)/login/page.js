export default function LoginPage() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
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
      </div>
    </>
  );
}
