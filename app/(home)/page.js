import Link from "next/link";

import TestPagesNavigation from "../components/testpagesNavigation";
import AuctionPagination from "../components/auctionPagination";
import CardAuction from "../components/cardAuction";

export default function Home() {
  const chiara = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      {/* <TestPagesNavigation /> */}

      <Link href="/auction-details" className="italic">
        Go to auction details →
      </Link>

      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-rows-auto grid-cols-4 gap-x-14">
          {chiara.map((number) => (
            <>
              <CardAuction key={number} isHomepage={true} />
            </>
          ))}
        </div>

        <div className="my-5 mt-10">
          <AuctionPagination />
        </div>
      </div>
    </>
  );
}
