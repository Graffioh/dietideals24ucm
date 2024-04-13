import Link from "next/link";

export default function GetStartedPage() {
  return (
    <>
      <div className="flex flex-col h-[80vh] justify-center items-center w-full">
        <div className="mb-4 ml-7 text-3xl md:text-7xl font-extrabold">
          <h1>Sell and buy with just a few clicks. </h1>
        </div>
        <div className="mb-4 italic ml-5 text-xl md:text-4xl">
          <p>
            It&apos;s easy and fast to use. Are you ready?
          </p>
        </div>
        <Link href="/home">
          <div className="mt-2 bg-blue-950 text-white rounded p-3">
            Get started
          </div>
        </Link>
      </div>
    </>
  );
}
