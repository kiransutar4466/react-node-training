import CardSkeleton from "./CardSkeleton.tsx";

const MappedCardSkeleton = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center justify-items-center w-full p-1 pt-4 gap-y-6">
        {" "}
        {data.map((item) => (
          <CardSkeleton key={item} />
        ))}
      </div>
    </>
  );
};

export default MappedCardSkeleton;
