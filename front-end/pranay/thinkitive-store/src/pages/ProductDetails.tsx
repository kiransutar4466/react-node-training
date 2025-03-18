import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { rootState } from "../redux/store";
import CardSkeleton from "../components/SkeletonProduct";
import { FETCH_CURRENT_PRODUCTS } from "../redux/constants";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { currentProduct, isLoading, error } = useSelector(
    (state: rootState) => state.currentProduct
  );
  const { id, title, price, description, category, image, rating } =
    currentProduct;
  useEffect(() => {
    dispatch({ type: FETCH_CURRENT_PRODUCTS, payload: productId });
  }, []);

  console.log(currentProduct, "current product inside product details page");
  error && toast.error(error);
  return (
    <>
      {" "}
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="flex md:flex-nowrap flex-wrap overflow-y-scroll w-[90%] h-[90vh] gap-2 p-5 bg-amber-100 m-auto mt-5 rounded-lg justify-center">
          <div className="w-fit p-3 ">
            <img
              src={image}
              alt={title}
              className="w-full min-w-[350px] max-h-[90%] max-w-[350px] p-3 border-1 rounded-lg"
            />
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    addToCart({
                      id,
                      title,
                      price,
                      description,
                      category,
                      image,
                      rating,
                    })
                  );
                }}
                className="bg-blue-600 text-amber-50 text-lg p-1 rounded-lg cursor-pointer w-full mt-2"
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-start gap-4">
            <div>
              {" "}
              <h2 className="font-bold text-3xl">{title}</h2>
              <p className="text-[20px]">{description}</p>
            </div>

            <div>
              <p className="font-bold">
                Category: <span className="font-light">{category}</span>
              </p>
              <p className="font-bold">
                Ratings: <span className="font-light">{rating?.rate}</span>
                <span className="font-light">{` (${rating?.count})`}</span>
              </p>
            </div>

            <p className="font-bold">
              Price: <span className="font-bold text-green-600">{price} $</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
