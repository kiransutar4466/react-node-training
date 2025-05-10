import { useSelector } from "react-redux";
import { rootState } from "../redux/store";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import {
  addToCart,
  removeFromCart,
  decrementFromCart,
} from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Cart = () => {
  const cart = useSelector((state: rootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalItems = cart.reduce((acc, item) => {
    acc += item.count ? item.count : 0;
    return acc;
  }, 0);
  const totalPrice = cart.reduce((acc, item) => {
    acc += item.count && item.price ? item.price * item.count : 0;

    return acc;
  }, 0);

  return (
    <>
      <h3 className="text-center text-2xl font-bold m-3">Cart</h3>
      <ul className="md:w-[700px] m-auto mb-5">
        {cart.map((item, key) => (
          <li
            key={key}
            className="w-full flex justify-between items-center h-26 my-2 gap-y-5 bg-amber-100 rounded-lg p-5"
          >
            <span className="w-[250px]">{item.title}</span>
            <div className="flex w-fit space-x-3 rounded-lg border-1 p-2">
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  item.count &&
                    (item.count > 1
                      ? dispatch(decrementFromCart(item.id))
                      : dispatch(removeFromCart(item.id)));
                }}
              >
                <FaMinus />
              </span>
              <span className="">{item.count}</span>
              <span
                className="font-bold cursor-pointer"
                onClick={() => dispatch(addToCart(item))}
              >
                <FaPlus />
              </span>
            </div>

            <span className="w-[80px] text-green-600 font-medium">
              {item.price &&
                Math.ceil(item.price * (item.count ? item.count : 1))}
              $
            </span>
          </li>
        ))}
        <li className="w-full flex justify-between items-center h-26 my-2 gap-y-5 bg-amber-100 rounded-lg p-5">
          <span className="w-[250px] text-[18px] font-medium">Total :</span>
          <span className="w-fit p-2 text-[18px] font-medium">
            {totalItems} Items
          </span>
          <span className="w-[80px] text-green-600 font-bold text-2xl">
            {Math.ceil(totalPrice)}$
          </span>
        </li>
        <button
          disabled={totalItems < 1}
          onClick={() =>
            toast.success("Order Placed Successfully! Happy Shopping!")
          }
          className="w-full bg-blue-700 p-3 rounded-lg cursor-pointer text-amber-50"
        >
          Buy Now
        </button>
      </ul>
    </>
  );
};

export default Cart;
