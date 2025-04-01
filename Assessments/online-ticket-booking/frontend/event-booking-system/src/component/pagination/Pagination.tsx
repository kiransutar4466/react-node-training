


const Pagination = ({ nextPageNuber, setNextPageNumber,hasNext }:any) => {
  const handleNextPage = () => {
    setNextPageNumber((prev:any) => prev + 1);
  };
  const handlePreviousPage = () => {
    setNextPageNumber((prev:any) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div className="flex justify-center items-center p-10">
      <div className="flex  gap-4 w-[300px]">
        {" "}
        <button
          className="bg-black text-white px-6 cursor-pointer rounded-[8px]"
          onClick={handlePreviousPage}
        >
          Prev Page
        </button>
        <p className="text-black p-1">{nextPageNuber}</p>
        <button
          className="bg-black text-white px-6 cursor-pointer rounded-[8px]"
          onClick={handleNextPage}
          disabled={hasNext.last==nextPageNuber
          }
        >
          Next Page
        </button>{" "}
      </div>
    </div>
  );
};

export default Pagination;
