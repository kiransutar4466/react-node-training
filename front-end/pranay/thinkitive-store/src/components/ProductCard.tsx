import { productType } from "../types/productsTypes";
import { addToCart } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const ProductCard = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}: productType) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`/product/${id}`)}
        className="flex flex-col justify-between overflow-hidden w-[250px] h-[300px] rounded-lg bg-zinc-900 m-2 text-zinc-300 cursor-pointer"
      >
        <img
          className="w-full h-[145px] "
          alt={title && title + category}
          src={image}
        />
        <div className="px-2">
          <h5 className="font-bold text-zinc-50">
            {title && title.slice(0, 25)}
          </h5>
          <span className="text-sm">
            {description && description.slice(0, 70)}...
          </span>
        </div>
        <div className="flex justify-between px-2 pb-2">
          <span className="text-green-700 font-bold">{price}$</span>
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
            className="bg-blue-600 text-sm p-1 rounded-lg cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
