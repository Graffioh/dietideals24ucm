import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Link href="/login" className="italic">
          Go to login →
        </Link>
      </div>

      <div className="flex justify-center font-extrabold text-2xl">
        HOME content
      </div>
    </>
  );
}
