export default function CardAuction({ isHomepage }) {
  return (
    <>
      {isHomepage ? (
        <div className="">
          <button className="relative mt-10 bg-white w-64 h-80 flex justify-center rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
            <div className="relative">
              <img
                className="mt-5 rounded-lg flex items-center"
                src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
                width={230}
                height={140}
              />
            </div>

            <div className="absolute bottom-2 left-0 right-0 text-base flex flex-col">
              <div>Il solo e unico GEOLIER</div>

              <div></div>

              <div className="flex justify-between">
                <div className="text-2xl ml-8">€ 10,00</div>
                <div className="text-xl mr-8 mt-0.5">00.00.00</div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="">
          <button className="relative bg-white w-64 h-56 flex justify-center rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.15)]">
            <div className="relative">
              <img
                className="object-cover w-56 h-36 mt-5 rounded-lg flex items-center"
                src="https://m.media-amazon.com/images/I/A1P5H1w-mnL._UF1000,1000_QL80_.jpg"
              />
            </div>

            <div className="absolute bottom-1 left-0 right-0 text-base flex flex-col">
              <div>Il solo e unico GEOLIER</div>

              <div className="flex justify-between">
                <div className="text-2xl ml-8">€ 10,00</div>
                <div className="text-xl mr-8 mt-0.5">00.00.00</div>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
