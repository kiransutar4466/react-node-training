import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5';



const Pagination = ({ nextPageNuber, setNextPageNumber,hasNext,totalPages }:any) => {

  console.log("has",totalPages)
  const handleNextPage = () => {
    setNextPageNumber((prev:any) => prev + 1);
  };
  const handlePreviousPage = () => {
    setNextPageNumber((prev:any) => (prev > 1 ? prev - 1 : 1));
  };
  return (
    <div className="flex justify-end p-4 mt-1">

      <div className="flex gap-4">
        {" "}
        <button
          className="bg-black  text-white px-6 py-2 cursor-pointer rounded-[8px]"
          onClick={handlePreviousPage}
        >
         <IoChevronBack />
        </button>
        <p className="text-black p-1 text-[18px] font-bold">{nextPageNuber}/{totalPages?.totalPages}</p>
        <button
          className={` ${hasNext?.next?"bg-black":"bg-[#b0b0b0]"} text-white px-6 cursor-pointer rounded-[8px]`}
          onClick={handleNextPage}
          disabled={hasNext?.next==null
          }
        >
        <IoChevronForwardOutline />
        </button>{" "}
      </div>
    </div>
  );
};

export default Pagination;
