import TestPagesNavigation from "../components/testpagesNavigation";
import AuctionPagination from "../components/auctionPagination";
import CardAuction from "../components/cardAuction";

export default function Home() {
  const chiara = [69, 2, 3, 4, 5, 69, 2, 3, 4, 5, 69, 2, 3, 4, 5, 8];

  return (
    <>
      {/* <TestPagesNavigation /> */}

      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-rows-auto grid-cols-4 gap-x-14">
          {chiara.map((number) => (
            <CardAuction key={number} />
          ))}
        </div>

        <div className="my-5">
          <AuctionPagination />
        </div>
      </div>
    </>
  );
}
