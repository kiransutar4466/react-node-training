import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { rootState } from "../store/store";
import StatusComponent from "./StatusComponent";
import { VENDOR } from "../constants/roles";
import { addToCart, fetchCart, patchCart } from "../pages/cart-page/cartSaga";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect } from "react";

const ProductDetails = ({ productDetails }: { productDetails: any }) => {
  const { userDetails } = useSelector((state: rootState) => state.auth);
  const { cart } = useSelector((state: rootState) => state.cart);

  const cartItem = cart?.filter(
    (item) => item.productId == productDetails.id
  )[0];

  console.log(cartItem);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart({ page: 1, perPage: 10 }));
  }, []);

  return (
    <div className="bg-primary-white rounded-xl w-[600px] p-5">
      <div className="flex flex-col justify-between gap-3">
        <h2>
          <span className="font-medium">Product Name: </span>{" "}
          {productDetails.name}
        </h2>
        <p>
          <span className="font-medium">Description: </span>{" "}
          {productDetails.description}
        </p>
        <p>
          <span className="font-medium">Price: </span> ${productDetails.price}
        </p>
        <p className="flex gap-2 items-center">
          <span className="font-medium">Stock Status: </span>{" "}
          <StatusComponent
            bgColor={`${
              productDetails.stockStatus == "IN_STOCK"
                ? "#c0fcbd"
                : productDetails.stockStatus == "LOW_STOCK"
                ? "#fdff93"
                : "#fcd6d6"
            }`}
            color={`${
              productDetails.stockStatus == "IN_STOCK"
                ? "#029300"
                : productDetails.stockStatus == "LOW_STOCK"
                ? "#8a8e00"
                : "#d10606"
            }`}
            content={productDetails.stockStatus
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/(?<=\b)\w/g, (match: string) => match.toUpperCase())}
          />{" "}
        </p>
        <p>
          <span className="font-medium">Sold Count: </span>{" "}
          {productDetails.soldCount}
        </p>
        {productDetails.inventoryId == userDetails?.inventoryId &&
          <p>
          <span className="font-medium">Quantity: </span>{" "}
          {productDetails.quantity}
        </p>
        }
        <p>
          <span className="font-medium">Vendor: </span>{" "}
          {productDetails.inventoryName}
        </p>
      </div>
      <div className=" flex justify-end">
        {userDetails?.role == VENDOR &&
          productDetails.inventoryId !== userDetails.inventoryId &&
          (cartItem ? (
            <div className="w-[100px] py-1 flex justify-around bg-primary-orange rounded-xl items-center text-primary-white">
              <span
                className={`cursor-pointer ${
                  cartItem.quantity > 1
                    ? "text-primary-white"
                    : "text-secondary-gray"
                }`}
                onClick={() => {
                  cartItem.quantity > 1 &&
                    dispatch(
                      patchCart({
                        itemId: cartItem.id,
                        data: { quantity: cartItem.quantity - 1 },
                        dispatchAction: () => {
                          dispatch(fetchCart({ page: 1, perPage: 10 }));
                        },
                      })
                    );
                }}
              >
                <FaMinus />
              </span>
              <span> {cartItem.quantity}</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  dispatch(
                    patchCart({
                      itemId: cartItem.id,
                      data: { quantity: cartItem.quantity + 1 },
                      dispatchAction: () => {
                        dispatch(fetchCart({ page: 1, perPage: 10 }));
                      },
                    })
                  );
                }}
              >
                <FaPlus />
              </span>
            </div>
          ) : (
            <Button
              color="primary-white"
              bgColor="primary-orange"
              width="fit"
              btnContent={"Add to cart"}
              onClickCb={() =>
                dispatch(
                  addToCart({
                    productId: productDetails.id,
                    quantity: 1,
                    dispatchAction: () =>
                      dispatch(fetchCart({ page: 1, perPage: 10 })),
                  })
                )
              }
            />
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
