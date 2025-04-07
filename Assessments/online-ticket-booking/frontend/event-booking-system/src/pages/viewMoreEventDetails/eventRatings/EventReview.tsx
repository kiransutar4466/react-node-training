import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReviews } from '../reviews/reviewSaga';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const EventReview = ({setIsReviewVisiableCB}:any) => {
  const {id}=useParams()
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState('');
const dispatch=useDispatch()
const {loading}=useSelector((state:any)=>state.reviews)
  const handleStarClick = (starIndex:any) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex:any) => {
    setHoveredStar(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const token:any = localStorage.getItem("token");
    if(token)
    {
      const decoded: JwtPayload & { user_id: any } = jwtDecode(token);
   
      const formData = {
      userId: decoded?.user_id,
      eventId: Number(id),
      reviews:review ,
      rating: rating,
      setIsReviewVisiableCB:setIsReviewVisiableCB
      };
     dispatch(postReviews(formData))
     
      setRating(0);
      setReview('');
    }

  };

  return (
    <div className="w-[100%] mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
     
        <div className="flex items-center mb-4">
          <span className="text-gray-600 mr-3">Your Rating:</span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
              const starIndex = index + 1;
              return (
                <svg
                  key={starIndex}
                  className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                    (hoveredStar || rating) >= starIndex ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  onClick={() => handleStarClick(starIndex)}
                  onMouseEnter={() => handleStarHover(starIndex)}
                  onMouseLeave={handleStarLeave}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.401c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                </svg>
              );
            })}
          </div>
        </div>

       
        <div className="mb-4">
          <label htmlFor="review" className="block text-gray-700 mb-2">
            Your Review:
          </label>
          <textarea
            id="review"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Share your thoughts about the event..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>

       {loading? <button
          
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <CircularProgress />
        </button>: <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Submit Review
        </button>}
       
      </form>
    </div>
  );
};

export default EventReview;
