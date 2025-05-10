import { useNavigate } from "react-router";

const Custom404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-between items-center">
        <div>Oops! url did not match, or there may be typo in url</div>
        <h2 className="text-3xl font-bold">404 Page Not Found!!</h2>
        <button
          className="bg-blue-600 text-amber-50 p-2 m-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          Go to Home Page
        </button>
      </div>
    </>
  );
};

export default Custom404;
