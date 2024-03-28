
export default function AddAuctionImageBox({ onFileChange, onHiddenFileInputChange, hiddenFileInput }) {
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onHiddenFileInputChange();
        }}
        className="w-52 h-52 mt-2 text-2xl bg-blue-950 text-white rounded p-3"
      >
        +
      </button>
      <input onChange={onFileChange} type="file" ref={hiddenFileInput} style={{ display: "none" }} />
    </div>
  );
}
