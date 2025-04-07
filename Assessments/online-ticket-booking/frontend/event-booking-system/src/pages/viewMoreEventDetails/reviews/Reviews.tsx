const Reviews = ({ rviewData }: any) => {
  console.log("rviewData", rviewData);

  return (
    <div className="w-full bg-[#f1f1f1]">
      <div className="overflow-x-auto  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        
        <div className="inline-flex space-x-4 p-4">
          {rviewData.map((review: any, idx: number) => (
            
            <div
              key={idx}
              className="w-[400px] bg-white border border-gray-300 rounded-lg p-6 shadow-md "
            >
              {review?.user?.firstName} <span>  {review?.user?.lastName}</span>
               <div className="flex items-center mt-1 ">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-justify  whitespace-normal mt-2">
                {review.reviews}
              </p>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
