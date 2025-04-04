


const Pagination = ({ nextPageNuber, setNextPageNumber,hasNext }:any) => {

  console.log("has",hasNext)
  const handleNextPage = () => {
    setNextPageNumber((prev:any) => prev + 1);
  };
  const handlePreviousPage = () => {
    setNextPageNumber((prev:any) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div className="flex justify-end items-center p-4 mt-4">
      <div className="flex  gap-4 w-[400px]">
        {" "}
        <button
          className="bg-black text-white px-6 py-2 cursor-pointer rounded-[8px]"
          onClick={handlePreviousPage}
        >
          Prev Page
        </button>
        <p className="text-black p-1 text-[18px] font-bold">{nextPageNuber}</p>
        <button
          className="bg-black text-white px-6 cursor-pointer rounded-[8px]"
          onClick={handleNextPage}
          disabled={hasNext?.next==null
          }
        >
          Next Page
        </button>{" "}
      </div>
    </div>
  );
};

export default Pagination;
