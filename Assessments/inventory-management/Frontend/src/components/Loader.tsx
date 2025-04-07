const Loader = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div
        className={`w-22 h-22 border-4 border-transparent text-dark-orange text-4xl animate-spin flex items-center justify-center border-t-primary-orange rounded-full`}
      >
        <div className="w-18 h-18 border-4 border-transparent text-secondary-orange text-2xl animate-spin flex items-center justify-center border-t-secondary-orange rounded-full"></div>
      </div>
    </div>
    </div>
    
  );
};

export default Loader;
