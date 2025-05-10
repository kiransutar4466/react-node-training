import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts } from "../redux/slices/productSlice";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { rootState } from "../redux/store";
import { setLogout } from "../redux/slices/authSlice";
import { Badge } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const { isLoggedIn } = useSelector((state: rootState) => state.auth);
  const cart = useSelector((state: rootState) => state.cart.cartItems);
  const navigate = useNavigate();
  const debounceValue = useDebounce({ value: searchText, delay: 1000 });

  const totalItems = cart.reduce((acc, item) => {
    acc += item.count ? item.count : 0;
    return acc;
  }, 0);

  const handleOnChange = (e: { target: { value: string } }) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (debounceValue.length > 2 || debounceValue.length == 0) {
      dispatch(filterProducts(debounceValue));
    }
  }, [debounceValue, searchText]);

  return (
    <>
      <div className="flex flex-col fixed top-0 w-full md:flex-row justify-between items-center p-2 px-5 bg-amber-900 text-amber-50 ">
        <div>
          <h5 className="text-xl">Thinkitive Store</h5>
        </div>

        <div>
          <input
            value={searchText}
            onChange={handleOnChange}
            className="p-1 bg-zinc-500 rounded-lg text-amber-50"
            placeholder="Search..."
            type="text"
          />
        </div>

        <nav>
          <ul className="flex space-x-5 items-center justify-between">
            <li className=" text-center ">
              <Link className="nav-text" to={"/"}>
                Home
              </Link>
            </li>
            <li className="text-center">
              <Link className="nav-text" to={"/about"}>
                About
              </Link>
            </li>
            <li className=" text-center">
              {isLoggedIn ? (
                <span
                  onClick={() => {
                    navigate("/");
                    dispatch(setLogout());
                  }}
                  className="nav-text"
                >
                  Logout
                </span>
              ) : (
                <Link className="nav-text" to={"/login"}>
                  Login
                </Link>
              )}
            </li>
            <li className=" text-center">
              {isLoggedIn && (
                <Link className="nav-text" to={"/cart"}>
                  <Badge badgeContent={totalItems} color="primary">
                    <FaShoppingCart />
                  </Badge>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavbarComponent;
