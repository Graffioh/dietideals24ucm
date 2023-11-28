export default function InsertAuctionPage() {
  return (
    <>
      <div className="flex">
        <div className="m-4 grid grid-cols-2 gap-2 w-96 max-w-screen h-96 max-h-screen">
          <button className="mt-2 bg-indigo-950 text-white rounded p-3">
            1
          </button>
          <button className="mt-2 bg-indigo-950 text-white rounded p-3">
            2
          </button>
          <button className="mt-2 bg-indigo-950 text-white rounded p-3">
            3
          </button>
        </div>

        <div className="m-4 grid gap-3">
            <input className="border-2 border-black"></input>
            <input className="border-2 border-black"></input>
            <div className="border-2 border-blue-500">Combobox1</div>
            <div className="border-2 border-blue-500">Combobox2</div>
            <div className="border-2 border-blue-500">Combobox3</div>
        </div>
      </div>
    </>
  );
}
