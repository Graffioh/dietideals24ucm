import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Link href="/login" className="italic">
          Go to login →
        </Link>

        <Link href="/get-started" className="italic">
          Go to get started →
        </Link>

        <Link href="/insert-auction" className="italic">
          Go to insert auction (general)→
        </Link>

        <Link href="/private-profile" className="italic">
          Go to private profile →
        </Link>
      </div>

      <div className="flex justify-center font-extrabold text-2xl">
        HOME content
      </div>
    </>
  );
}
