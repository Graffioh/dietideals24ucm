export default function AddAuctionImageBox({ handleFileUploadClick, hiddenFileInput }) {
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleFileUploadClick();
        }}
        className="w-52 h-52 mt-2 text-2xl bg-blue-950 text-white rounded p-3"
      >
        +
      </button>
      <input type="file" ref={hiddenFileInput} style={{ display: "none" }} />
    </div>
  );
}
